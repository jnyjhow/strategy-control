const state = () => {
  return {
    authenticated: false,
    selectedInitial: false,
    auth: {
      conectetion: false,
      token: null,
      validateToken: false,
    },
    passwordReset: false,
  }
}

export default state
