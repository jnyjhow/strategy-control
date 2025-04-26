const actions = {
  setDialogTransactionDeposit(payload) {
    this.dialogTransictionDeposit = payload
  },
  setDialogConfirmAction(payload) {
    this.dialogConfirmAction = payload
  },
  setDialogConfirmHeader(payload) {
    this.dialogConfirmHeader = payload
  },
  setDialogConfirmBody(payload) {
    this.dialogConfirmBody = payload
  },
  setDialogactionHeaderBody(action, header, body) {
    this.dialogConfirmAction = action
    this.dialogConfirmHeader = header
    this.dialogConfirmBody = body
  },
}
export default { ...actions }
