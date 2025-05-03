const state = () => {
  return {
    dialogTransictionDeposit: false,
    dialogConfirmAction: false,
    dialogConfirmHeader: 'Solicitação enviada com sucesso!',
    dialogConfirmBody:
      'A solicitação foi enviada com sucesso, você pode acompanhar o status dela na aba "Solicitações".',
    dialogOpengHeader: 'Solicitação de Depósito',
    dataSolicitacao: {
      bank: '',
      type: 'deposit',
      destination: 'movimentar',
    },
    paramentros: false,
  }
}

export default state
