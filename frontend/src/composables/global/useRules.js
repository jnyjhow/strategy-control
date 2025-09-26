import { storeToRefs } from 'pinia'
import { useAuthStore } from 'src/stores/auth'
import { ref, computed, watch } from 'vue'

export default function useRules() {
  const personRef = ref(null)
  const passwordRef = ref(null)
  const passwordConfirmRef = ref(null)
  const authStore = useAuthStore()
  const { auth } = storeToRefs(authStore)
  const emailRe =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const stringSerialize = (string) => {
    return string.replace(/[^0-9]/g, '')
  }
  const fiedValidate = ref([
    { id: 1, name: 'Contém letra maiuscula', status: false },
    { id: 2, name: 'Contém letra minuscula', status: false },
    { id: 3, name: 'Contém caracters Especiais', status: false },
    { id: 4, name: 'Contém números', status: false },
    { id: 5, name: 'Contém tamanho superior a 8', status: false },
  ])

  const patternsRules = {
    length20: (val) => val.length < 20 || 'Tem que ser maior que 20 caracetres',
  }
  const verifyExist = (value) => {
    return value != null && value != undefined && value != ''
  }

  const cnpjRule = [
    (val) => !!val || 'Campo é obrigatorio.',
    (val) => val.length == 18 || 'Campo incompleto',
  ]
  const nameRule = [
    (val) => !!val || 'Campo é obrigatorio.',
    (val) => val.length >= 3 || 'Campo não tem mímino',
    (val) => !/\d/.test(val) || 'Adicione um Nome válido!',
  ]
  const emailRule = [
    (val) => !!val || 'Campo é obrigatorio.',
    (val) => emailRe.test(val) || 'Campo invalido!',
  ]
  const requiredRole = [(val) => !!val || 'Campo é obrigatorio.']
  const phoneRole = [
    (val) => !!val || 'Campo é obrigatorio.',
    (val) => val.length == 16 || 'Campo incompleto',
  ]
  const zipCodeRule = [
    (val) => !!val || 'Campo é obrigatorio.',
    (val) => val.length == 9 || 'Campo incompleto',
  ]
  const passwordConfirmRule = [
    (value) => !!value || 'Campo é obrigatorio',
    (value) => value == auth.value.password || 'Senhas não conferem',
  ]
  const personRule = [
    (val) => !!val || 'Campo é obrigatorio.',
    (val) => val.length == 14 || 'Campo incompleto',
  ]
  const validateID = (e) => {
    if (verifyExist(e)) {
      if (patternsRules['length20'](e)) {
        return false
      }
    }
    return true
  }

  // password
  const verifyValue = computed(() => auth.value.password)

  watch(verifyValue, (n) => {
    ;/\d/.test(n) ? (fiedValidate.value[3].status = true) : (fiedValidate.value[3].status = false)
    ;/[^\w\s]/.test(n)
      ? (fiedValidate.value[2].status = true)
      : (fiedValidate.value[2].status = false)
    ;/[A-Z]/.test(n)
      ? (fiedValidate.value[1].status = true)
      : (fiedValidate.value[1].status = false)
    ;/[a-z]/.test(n)
      ? (fiedValidate.value[0].status = true)
      : (fiedValidate.value[0].status = false)
    n.length > 8 ? (fiedValidate.value[4].status = true) : (fiedValidate.value[4].status = false)
  })

  return {
    personRule,
    personRef,
    passwordRef,
    passwordConfirmRef,
    cnpjRule,
    fiedValidate,
    requiredRole,
    nameRule,
    emailRule,
    phoneRole,
    zipCodeRule,
    stringSerialize,
    validateID,
    passwordConfirmRule,
  }
}
