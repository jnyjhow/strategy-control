const actions = {
  setPasswordReset(payload) {
    this.passwordReset = payload
  },
  setValidateToken(payload) {
    this.auth.validateToken = payload
  },
  setAuthEmail(payload) {
    this.auth.email = payload
  },
  setAuth(payload) {
    this.auth = payload
  },
}
export default { ...actions }
