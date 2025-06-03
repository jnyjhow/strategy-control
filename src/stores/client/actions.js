import useCliente from 'src/composables/Fakes/useCliente'
const { getClient } = useCliente()
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
  setToReplace(newId, remove) {
    this.compare = this.compare.filter((item) => item.id !== remove)
    console.log('setToReplace', getClient(newId))
    this.setCompare([getClient(newId)])
  },
  setCompareSelect(payload) {
    this.compare = payload
  },
}
export default { ...actions }
