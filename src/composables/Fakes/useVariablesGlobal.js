export default function useVariablesGlobal() {
  // Opções para filtros
  const tiposOptions = ['Depósito', 'Transferência', 'Saque', 'Saldo']
  const statusOptions = ['Pendente', 'Concluído', 'Atrasado']

  return {
    tiposOptions,
    statusOptions,
  }
}
