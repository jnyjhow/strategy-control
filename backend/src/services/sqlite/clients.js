const Database = require('better-sqlite3')
const path = require('path')

const dbFile = process.env.SQLITE_FILE || path.join(__dirname, '../../../dev.sqlite')
const db = new Database(dbFile)

// Create table if not exists (data column may be added by migration step below)
db.prepare(
  `CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    cpf_cnpj TEXT,
    email TEXT
  )`
).run()

// Ensure `data` column exists (migration): add if missing
const cols = db.prepare("PRAGMA table_info('clients')").all()
const hasDataCol = cols.some((c) => c.name === 'data')
if (!hasDataCol) {
  try {
    db.prepare('ALTER TABLE clients ADD COLUMN data TEXT').run()
  } catch (err) {
    // ignore if cannot add (concurrent), will fail later if really missing
    console.error('warning: could not add data column', err && err.message)
  }
}

// Ensure unique index on cpf_cnpj (digits-only). If already exists, ignore error.
try {
  db.prepare('CREATE UNIQUE INDEX IF NOT EXISTS idx_clients_cpf_cnpj ON clients(cpf_cnpj)').run()
} catch (err) {
  console.error('warning: could not ensure unique index on cpf_cnpj', err && err.message)
}

function toShape(row) {
  if (!row) return null
  if (row.data) {
    try {
      const parsed = JSON.parse(row.data)
      // if parsed looks like the nested cliente (legacy), keep compatibility
      if (parsed && (parsed.name || parsed.cpf_cnpj || parsed.email) && !parsed.cliente) {
        return { id: row.id, cliente: parsed }
      }
      // otherwise assume parsed contains the full saved object (possibly with cliente nested)
      if (parsed && typeof parsed === 'object') {
        return Object.assign({ id: row.id }, parsed)
      }
    } catch (err) {
      console.error('warning: invalid json in clients.data for id', row.id)
    }
  }
  // Fallback: construct cliente from flat columns
  return {
    id: row.id,
    cliente: {
      name: row.name,
      cpf_cnpj: row.cpf_cnpj,
      email: row.email,
    },
  }
}

function list() {
  const rows = db.prepare('SELECT * FROM clients').all()
  return rows.map(toShape)
}

function get(id) {
  const row = db.prepare('SELECT * FROM clients WHERE id = ?').get(id)
  return toShape(row)
}

function create(data) {
  // Accept either full object (from frontend) or { cliente }
  const payloadObj = data || {}
  const cliente = payloadObj.cliente || payloadObj
  // normalize cpf_cnpj to digits only if present
  if (cliente && cliente.cpf_cnpj) {
    cliente.cpf_cnpj = String(cliente.cpf_cnpj).replace(/\D/g, '')
  }
  // store the whole payload object (so frontend structure is preserved)
  const payload = JSON.stringify(payloadObj.cliente ? payloadObj : { cliente: payloadObj })
  try {
    const info = db
      .prepare('INSERT INTO clients (name, cpf_cnpj, email, data) VALUES (?, ?, ?, ?)')
      .run(
        (cliente && cliente.name) || payloadObj.name || null,
        (cliente && cliente.cpf_cnpj) || null,
        (cliente && cliente.email) || payloadObj.email || null,
        payload,
      )
    return get(info.lastInsertRowid)
  } catch (err) {
    // better-sqlite3 throws with .code like 'SQLITE_CONSTRAINT' or 'SQLITE_CONSTRAINT_UNIQUE'
    const isConstraint = (err && err.code && String(err.code).indexOf('SQLITE_CONSTRAINT') === 0) ||
      (err && err.message && String(err.message).toLowerCase().includes('unique constraint failed'))
    if (isConstraint) {
      const e = new Error('CPF/CNPJ already exists')
      e.status = 409
      e.detail = { field: 'cpf_cnpj', message: 'CPF/CNPJ já cadastrado.' }
      throw e
    }
    throw err
  }
}

function update(id, data) {
  const payloadObj = data || {}
  const cliente = payloadObj.cliente || payloadObj
  if (cliente && cliente.cpf_cnpj) {
    cliente.cpf_cnpj = String(cliente.cpf_cnpj).replace(/\D/g, '')
  }
  const payload = JSON.stringify(payloadObj.cliente ? payloadObj : { cliente: payloadObj })
  try {
    const info = db
      .prepare('UPDATE clients SET name = ?, cpf_cnpj = ?, email = ?, data = ? WHERE id = ?')
      .run(
        (cliente && cliente.name) || payloadObj.name || null,
        (cliente && cliente.cpf_cnpj) || null,
        (cliente && cliente.email) || payloadObj.email || null,
        payload,
        id,
      )
    if (info.changes === 0) return null
    return get(id)
  } catch (err) {
    const isConstraint = (err && err.code && String(err.code).indexOf('SQLITE_CONSTRAINT') === 0) ||
      (err && err.message && String(err.message).toLowerCase().includes('unique constraint failed'))
    if (isConstraint) {
      const e = new Error('CPF/CNPJ already exists')
      e.status = 409
      e.detail = { field: 'cpf_cnpj', message: 'CPF/CNPJ já cadastrado.' }
      throw e
    }
    throw err
  }
}

function del(id) {
  const info = db.prepare('DELETE FROM clients WHERE id = ?').run(id)
  return info.changes > 0
}

module.exports = { list, get, create, update, delete: del }
