const actions = {
  setCompare(payload) {
    this.compare.push(...payload)
  },
  setClearCompare() {
    this.compare = []
  },
  setRemoveEmpty() {
    this.compare = this.compare.filter((item) => item.id != 0)
  },

  setCompareSelect(payload) {
    this.compare = payload
  },

  setLeadEdit(payload) {
    this.leadEdit = payload
  },
}
export default { ...actions }
