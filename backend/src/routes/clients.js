const express = require('express')
const router = express.Router()

const useFakes = (process.env.USE_FAKES || 'true') === 'true'

let adapter
if (useFakes) {
  adapter = require('../services/fakes/clients')
} else {
  adapter = require('../services/sqlite/clients')
}

// List
router.get('/', (req, res) => {
  const list = adapter.list()
  res.json(list)
})

// Get by id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const item = adapter.get(id)
  if (!item) return res.status(404).json({ error: 'Not found' })
  res.json(item)
})

// Validation with Joi
const Joi = require('joi')
const path = require('path')
const fs = require('fs')

// load locale messages (pt-BR) - fallback to inline mapping
let localeMessages = {}
try {
  const p = path.join(__dirname, '..', 'locales', 'pt-BR.json')
  const raw = fs.readFileSync(p, 'utf8')
  localeMessages = JSON.parse(raw)
} catch (err) {
  // ignore, will use defaults in formatJoiError
}

// Inline CPF/CNPJ validation (no external dependency)
function isValidCPF(str) {
  const s = String(str).replace(/\D/g, '')
  if (!/^[0-9]{11}$/.test(s)) return false
  // Reject known invalid CPFs
  if (/^(\d)\1+$/.test(s)) return false
  let sum = 0
  for (let i = 0; i < 9; i++) sum += Number(s.charAt(i)) * (10 - i)
  let rev = 11 - (sum % 11)
  if (rev === 10 || rev === 11) rev = 0
  if (rev !== Number(s.charAt(9))) return false
  sum = 0
  for (let i = 0; i < 10; i++) sum += Number(s.charAt(i)) * (11 - i)
  rev = 11 - (sum % 11)
  if (rev === 10 || rev === 11) rev = 0
  if (rev !== Number(s.charAt(10))) return false
  return true
}

function isValidCNPJ(str) {
  const s = String(str).replace(/\D/g, '')
  if (!/^[0-9]{14}$/.test(s)) return false
  if (/^(\d)\1+$/.test(s)) return false
  const calc = (t) => {
    let n = 0
    let pos = t - 7
    for (let i = t; i >= 1; i--) {
      n += Number(s.charAt(t - i)) * pos--
      if (pos < 2) pos = 9
    }
    const res = n % 11
    return res < 2 ? 0 : 11 - res
  }
  const d1 = calc(12)
  if (d1 !== Number(s.charAt(12))) return false
  const d2 = calc(13)
  if (d2 !== Number(s.charAt(13))) return false
  return true
}

// custom validator for cpf_cnpj: accepts CPF or CNPJ formatted or plain
const cpfCnpjValidator = (value, helpers) => {
  // Allow skipping strict CPF/CNPJ validation in dev if requested
  if ((process.env.DEV_SKIP_CPF_VALIDATION || 'false') === 'true') {
    return value
  }
  if (!value) return value
  const v = String(value).replace(/\D/g, '')
  if (v.length === 11 && isValidCPF(v)) return value
  if (v.length === 14 && isValidCNPJ(v)) return value
  return helpers.error('any.invalid')
}

const clienteSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  cpf_cnpj: Joi.string().custom(cpfCnpjValidator).optional(),
  birth: Joi.string().optional(),
}).unknown(true) // allow other fields

function ValidationError(detail, status = 400) {
  const e = new Error('Validation')
  e.detail = detail
  e.status = status
  return e
}

function validateClientBody(req, res, next) {
  const body = req.body
  const cliente = body && (body.cliente || body)
  const { error } = clienteSchema.validate(cliente)
  if (error) {
    // traduzir mensagem do Joi para pt-BR
    const detail = error.details && error.details[0]
    const errObj = formatJoiError(detail)
    return next(ValidationError(errObj, 400))
  }
  next()
}

function formatJoiError(detail) {
  if (!detail) return { field: null, message: localeMessages['payload_invalid'] || 'Payload inválido.' }
  const key = detail.context && detail.context.key
  const type = detail.type

  // try locale lookup
  if (type === 'any.required') {
    const tpl = localeMessages['any.required']
    const message = tpl ? tpl.replace('{field}', key) : `O campo '${key}' é obrigatório.`
    return { field: key, message }
  }
  if (type === 'string.email') {
    const tpl = localeMessages['string.email']
    const message = tpl ? tpl.replace('{field}', key) : `O campo '${key}' deve ser um email válido.`
    return { field: key, message }
  }
  if (type === 'string.min') {
    const tpl = localeMessages['string.min']
    const message = tpl ? tpl.replace('{field}', key).replace('{limit}', detail.context.limit) : `O campo '${key}' deve ter pelo menos ${detail.context.limit} caracteres.`
    return { field: key, message }
  }
  if (type === 'any.invalid' && key === 'cpf_cnpj') {
    const message = localeMessages['cpf_invalid'] || 'CPF/CNPJ inválido.'
    return { field: key, message }
  }

  // fallback to original message
  return { field: key || null, message: detail.message || (localeMessages['payload_invalid'] || 'Payload inválido.') }
}

// Normalize cpf_cnpj: strip non-digits if present
function normalizeCpfCnpj(req, res, next) {
  const body = req.body || {}

  // Recursively normalize cpf_cnpj fields in any nested object/array
  function normalize(obj) {
    if (!obj || typeof obj !== 'object') return
    if (Array.isArray(obj)) {
      for (const item of obj) normalize(item)
      return
    }
    for (const key of Object.keys(obj)) {
      if (key === 'cpf_cnpj' && obj[key]) {
        obj[key] = String(obj[key]).replace(/\D/g, '')
        continue
      }
      const val = obj[key]
      if (val && typeof val === 'object') normalize(val)
    }
  }

  normalize(body)
  next()
}

// Create
router.post('/', normalizeCpfCnpj, validateClientBody, (req, res) => {
  const data = req.body
  const created = adapter.create(data)
  res.status(201).json(created)
})

// Update
router.put('/:id', normalizeCpfCnpj, validateClientBody, (req, res) => {
  const id = Number(req.params.id)
  const data = req.body
  const updated = adapter.update(id, data)
  if (!updated) return res.status(404).json({ error: 'Not found' })
  res.json(updated)
})

// Delete
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  const ok = adapter.delete(id)
  if (!ok) return res.status(404).json({ error: 'Not found' })
  res.status(204).send()
})

module.exports = router
