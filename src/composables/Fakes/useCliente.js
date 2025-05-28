export default function useCliente() {
  const columnsClient = [
    {
      name: 'cliente',
      required: true,
      label: 'Cliente',
      align: 'left',
      field: 'cliente',
      sortable: true,
    },
    {
      name: 'assessor',
      align: 'right',
      label: 'Assessor',
      field: 'assessor',
      sortable: true,
      headerStyle: 'text-align: end',
    },
    {
      name: 'saldo',
      align: 'right',
      label: 'Saldo Para Investir(R$)',
      field: 'saldo',
      sortable: true,
      headerStyle: 'text-align: end',
    },
    {
      name: 'contrato',
      align: 'right',
      label: 'Contratro (R$)',
      field: 'contrato',
      headerStyle: 'text-align: end',
    },
    {
      name: 'dividendo',
      align: 'right',
      label: 'Dividendo (R$)',
      field: 'dividendo',
      headerStyle: 'text-align: end',
    },
    { name: 'emprestimo', align: 'left', label: 'Empréstimo', field: 'emprestimo' },
    {
      name: 'actions',
      label: '',
      field: 'actions',
      headerStyle: 'width: 10px; text-align: end',
    },
  ]

  const rowsClient = [
    {
      id: 1,
      newWeLend: {},
      weLend: [
        {
          contrato: 'Contrato 1',
          valor: 10000,
          status: 'Ativo',
          vigencia: '31/12/2030',
          saldo: 5000,
        },
      ],
      investment: {},
      bank: {},
      residential: {},
      bankRegister: [
        {
          chave_pix: '123456789',
          cpf_cnpj: '123.456.789-00',
          name: 'Banco Exemplo',
          agency: '1234',
          account: '56789-0',
          type: 'Conta Corrente',
          status: 'Ativo',
        },
      ],
      cliente: {
        name: 'Carlos Silva',
        avatar: 'https://sources.strategyanalytics.com.br/storage/users/_Avatar_.png',
        email: 'carlos@gstrategyanalytics.com.br',
      },
      assessor: 'Joe Doe',
      saldo: 210000,
      contrato: {
        total: 30000.0,
        quantity: '2 contratos',
      },
      dividendo: {
        total: 250.0,
        data: '31/01/2030',
      },
      emprestimo: 'Status',
    },
    {
      id: 2,
      newWeLend: {},
      weLend: [
        {
          contrato: 'Contrato 1',
          valor: 10000,
          status: 'Ativo',
          vigencia: '31/12/2030',
          saldo: 5000,
        },
      ],
      investment: {},
      bank: {},
      residential: {},
      bankRegister: [
        {
          chave_pix: '123456789',
          cpf_cnpj: '123.456.789-00',
          name: 'Banco Exemplo',
          agency: '1234',
          account: '56789-0',
          type: 'Conta Corrente',
          status: 'Ativo',
        },
      ],
      cliente: {
        name: 'Ana Oliveira',
        avatar: 'https://sources.strategyanalytics.com.br/storage/users/_Avatar_.png',
        email: 'ana@gstrategyanalytics.com.br',
      },
      assessor: 'Joe Doe',
      saldo: 210000,
      contrato: {
        total: 30000.0,
        quantity: '2 contratos',
      },
      dividendo: {
        total: 250.0,
        data: '31/01/2030',
      },
      emprestimo: 'Status',
    },
    {
      id: 3,
      newWeLend: {},
      weLend: [
        {
          contrato: 'Contrato 1',
          valor: 10000,
          status: 'Ativo',
          vigencia: '31/12/2030',
          saldo: 5000,
        },
      ],
      investment: {},
      bank: {},
      residential: {},
      bankRegister: [
        {
          chave_pix: '123456789',
          cpf_cnpj: '123.456.789-00',
          name: 'Banco Exemplo',
          agency: '1234',
          account: '56789-0',
          type: 'Conta Corrente',
          status: 'Ativo',
        },
      ],
      cliente: {
        name: 'Pedro Santos',
        avatar: 'https://sources.strategyanalytics.com.br/storage/users/_Avatar_.png',
        email: 'pedro@gstrategyanalytics.com.br',
      },
      assessor: 'Joe Doe',
      saldo: 210000,
      contrato: {
        total: 30000.0,
        quantity: '2 contratos',
      },
      dividendo: {
        total: 250.0,
        data: '31/01/2030',
      },
      emprestimo: 'Status',
    },
    {
      id: 4,
      newWeLend: {},
      weLend: [
        {
          contrato: 'Contrato 1',
          valor: 10000,
          status: 'Ativo',
          vigencia: '31/12/2030',
          saldo: 5000,
        },
      ],
      investment: {},
      bank: {},
      residential: {},
      bankRegister: [
        {
          chave_pix: '123456789',
          cpf_cnpj: '123.456.789-00',
          name: 'Banco Exemplo',
          agency: '1234',
          account: '56789-0',
          type: 'Conta Corrente',
          status: 'Ativo',
        },
      ],
      cliente: {
        name: 'Mariana Costa',
        avatar: 'https://sources.strategyanalytics.com.br/storage/users/_Avatar_.png',
        email: 'mariana@gstrategyanalytics.com.br',
      },
      assessor: 'Joe Doe',
      saldo: 210000,
      contrato: {
        total: 30000.0,
        quantity: '2 contratos',
      },
      dividendo: {
        total: 250.0,
        data: '31/01/2030',
      },
      emprestimo: 'Status',
    },
    {
      id: 5,
      newWeLend: {},
      weLend: [
        {
          contrato: 'Contrato 1',
          valor: 10000,
          status: 'Ativo',
          vigencia: '31/12/2030',
          saldo: 5000,
        },
      ],
      investment: {},
      bank: {},
      residential: {},
      bankRegister: [
        {
          chave_pix: '123456789',
          cpf_cnpj: '123.456.789-00',
          name: 'Banco Exemplo',
          agency: '1234',
          account: '56789-0',
          type: 'Conta Corrente',
          status: 'Ativo',
        },
      ],
      cliente: {
        name: 'João Pereira',
        avatar: 'https://sources.strategyanalytics.com.br/storage/users/_Avatar_.png',
        email: 'joao@gstrategyanalytics.com.br',
      },
      assessor: 'Joe Doe',
      saldo: 210000,
      contrato: {
        total: 30000.0,
        quantity: '2 contratos',
      },
      dividendo: {
        total: 250.0,
        data: '31/01/2030',
      },
      emprestimo: 'Status',
    },
    {
      id: 6,
      newWeLend: {},
      weLend: [
        {
          contrato: 'Contrato 1',
          valor: 10000,
          status: 'Ativo',
          vigencia: '31/12/2030',
          saldo: 5000,
        },
      ],
      investment: {},
      bank: {},
      residential: {},
      bankRegister: [
        {
          chave_pix: '123456789',
          cpf_cnpj: '123.456.789-00',
          name: 'Banco Exemplo',
          agency: '1234',
          account: '56789-0',
          type: 'Conta Corrente',
          status: 'Ativo',
        },
      ],
      cliente: {
        name: 'Luiza Almeida',
        avatar: 'https://sources.strategyanalytics.com.br/storage/users/_Avatar_.png',
        email: 'luiza@gstrategyanalytics.com.br',
      },
      assessor: 'Joe Doe',
      saldo: 210000,
      contrato: {
        total: 30000.0,
        quantity: '2 contratos',
      },
      dividendo: {
        total: 250.0,
        data: '31/01/2030',
      },
      emprestimo: 'Status',
    },
    {
      id: 7,
      newWeLend: {},
      weLend: [
        {
          contrato: 'Contrato 1',
          valor: 10000,
          status: 'Ativo',
          vigencia: '31/12/2030',
          saldo: 5000,
        },
      ],
      investment: {},
      bank: {},
      residential: {},
      bankRegister: [
        {
          chave_pix: '123456789',
          cpf_cnpj: '123.456.789-00',
          name: 'Banco Exemplo',
          agency: '1234',
          account: '56789-0',
          type: 'Conta Corrente',
          status: 'Ativo',
        },
      ],
      cliente: {
        name: 'Carlos Silva',
        avatar: 'https://sources.strategyanalytics.com.br/storage/users/_Avatar_.png',
        email: 'carlos@gstrategyanalytics.com.br',
      },
      assessor: 'Joe Doe',
      saldo: 210000,
      contrato: {
        total: 30000.0,
        quantity: '2 contratos',
      },
      dividendo: {
        total: 250.0,
        data: '31/01/2030',
      },
      emprestimo: 'Status',
    },
    {
      id: 8,
      newWeLend: {},
      weLend: [
        {
          contrato: 'Contrato 1',
          valor: 10000,
          status: 'Ativo',
          vigencia: '31/12/2030',
          saldo: 5000,
        },
      ],
      investment: {},
      bank: {},
      residential: {},
      bankRegister: [
        {
          chave_pix: '123456789',
          cpf_cnpj: '123.456.789-00',
          name: 'Banco Exemplo',
          agency: '1234',
          account: '56789-0',
          type: 'Conta Corrente',
          status: 'Ativo',
        },
      ],
      cliente: {
        name: 'Ana Oliveira',
        avatar: 'https://sources.strategyanalytics.com.br/storage/users/_Avatar_.png',
        email: 'ana@gstrategyanalytics.com.br',
      },
      assessor: 'Joe Doe',
      saldo: 210000,
      contrato: {
        total: 30000.0,
        quantity: '2 contratos',
      },
      dividendo: {
        total: 250.0,
        data: '31/01/2030',
      },
      emprestimo: 'Status',
    },
    {
      id: 9,
      newWeLend: {},
      weLend: [
        {
          contrato: 'Contrato 1',
          valor: 10000,
          status: 'Ativo',
          vigencia: '31/12/2030',
          saldo: 5000,
        },
      ],
      investment: {},
      bank: {},
      residential: {},
      bankRegister: [
        {
          chave_pix: '123456789',
          cpf_cnpj: '123.456.789-00',
          name: 'Banco Exemplo',
          agency: '1234',
          account: '56789-0',
          type: 'Conta Corrente',
          status: 'Ativo',
        },
      ],
      cliente: {
        name: 'Pedro Santos',
        avatar: 'https://sources.strategyanalytics.com.br/storage/users/_Avatar_.png',
        email: 'pedro@gstrategyanalytics.com.br',
      },
      assessor: 'Joe Doe',
      saldo: 210000,
      contrato: {
        total: 30000.0,
        quantity: '2 contratos',
      },
      dividendo: {
        total: 250.0,
        data: '31/01/2030',
      },
      emprestimo: 'Status',
    },
    {
      id: 10,
      newWeLend: {},
      weLend: [
        {
          contrato: 'Contrato 1',
          valor: 10000,
          status: 'Ativo',
          vigencia: '31/12/2030',
          saldo: 5000,
        },
      ],
      investment: {},
      bank: {},
      residential: {},
      bankRegister: [
        {
          chave_pix: '123456789',
          cpf_cnpj: '123.456.789-00',
          name: 'Banco Exemplo',
          agency: '1234',
          account: '56789-0',
          type: 'Conta Corrente',
          status: 'Ativo',
        },
      ],
      cliente: {
        name: 'Mariana Costa',
        avatar: 'https://sources.strategyanalytics.com.br/storage/users/_Avatar_.png',
        email: 'mariana@gstrategyanalytics.com.br',
      },
      assessor: 'Joe Doe',
      saldo: 210000,
      contrato: {
        total: 30000.0,
        quantity: '2 contratos',
      },
      dividendo: {
        total: 250.0,
        data: '31/01/2030',
      },
      emprestimo: 'Status',
    },
  ]

  const getClient = (id) => {
    const client = rowsClient.find((client) => client.id === id)
    if (client) {
      return {
        ...client,
      }
    }
    return null
  }

  return {
    columnsClient,
    rowsClient,
    getClient,
  }
}
