<template>
  <div class="">
    <q-table
      flat
      dense
      class="my-sticky-header-column-table"
      title="Histórico de Transações"
      :rows="paginatedRows"
      :columns="columns"
      row-key="id"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      v-model:selected="selected"
      hide-pagination
      :pagination="pagination"
      @update:pagination="updatePagination"
      :loading="loading"
    >
      <!-- Filtros avançados -->
      <template v-slot:top>
        <div class="col-12 row q-mb-md">
          <div class="col-12 row q-col-gutter-sm">
            <!-- Filtro por data de solicitação -->
            <div class="col-xs-12 col-sm-4 col-md-2">
              <q-input
                v-model="dateRangeInput.solicitado"
                label="Data de Solicitação"
                outlined
                dense
                readonly
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="dateRange.solicitado" range mask="DD/MM/YYYY">
                        <div class="row items-center justify-end q-gutter-sm">
                          <q-btn
                            label="Cancelar"
                            color="primary"
                            flat
                            v-close-popup
                            @click="clearSolicitado"
                          />
                          <q-btn
                            label="OK"
                            color="primary"
                            flat
                            @click="updateDateInput('solicitado')"
                            v-close-popup
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>

            <!-- Filtro por data limite -->
            <div class="col-xs-12 col-sm-4 col-md-2">
              <q-input
                v-model="dateRangeInput.limitado"
                label="Data Limite"
                outlined
                dense
                readonly
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="dateRange.limitado" range mask="DD/MM/YYYY">
                        <div class="row items-center justify-end q-gutter-sm">
                          <q-btn
                            label="Cancelar"
                            color="primary"
                            flat
                            v-close-popup
                            @click="clearLimitado"
                          />
                          <q-btn
                            label="OK"
                            color="primary"
                            flat
                            @click="updateDateInput('limitado')"
                            v-close-popup
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>

            <!-- Filtro por tipo -->
            <div class="col-xs-12 col-sm-4 col-md-2">
              <q-select
                v-model="filters.tipo"
                :options="tiposOptions"
                label="Tipo de Movimentação"
                outlined
                dense
                multiple
                use-chips
              />
            </div>

            <!-- Filtro por status -->
            <div class="col-xs-12 col-sm-4 col-md-2">
              <q-select
                v-model="filters.status"
                :options="statusOptions"
                label="Status"
                outlined
                dense
                multiple
                use-chips
              />
            </div>

            <!-- <div class="col-xs-12 col-sm-4 col-md-2">
              <q-btn
                color="negative"
                icon="clear"
                label="Limpar filtros"
                @click="clearFilters"
                class="float-right"
              />
            </div> -->
          </div>
        </div>
        <div class="row">
          <p class="text-h6">Histórico de Transações</p>
        </div>
      </template>
      <!-- Coluna de Clientes -->
      <template v-slot:body-cell-cliente="props">
        <q-td :props="props">
          <q-item>
            <q-item-section avatar>
              <q-avatar size="32px" class="q-mr-sm">
                <q-img
                  :src="props.row.cliente.avatar"
                  :alt="props.row.cliente.name"
                  :title="props.row.cliente.name"
                />
              </q-avatar>
            </q-item-section>
            <q-item-section align="left">
              <q-item-label>
                {{ props.row.cliente.name }}
              </q-item-label>
              <q-item-label caption>
                {{ props.row.cliente.email }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <!-- <q-btn
            size="xs"
            outline
            padding="xs"
            class="custom-btn-muted"
            :label="props.row.cliente.name"
            no-caps
          /> -->
        </q-td>
      </template>
      <!-- Coluna de status personalizada -->
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-btn
            size="xs"
            outline
            padding="xs"
            :color="getStatusColor(props.row.status)"
            :class="getClasseStatus(props.row.status)"
            :label="props.row.status"
            no-caps
          />
        </q-td>
      </template>

      <!-- Coluna de documentos personalizada -->
      <template v-slot:body-cell-documentos="props">
        <q-td :props="props">
          <q-btn
            v-if="props.row.documentos !== 'Sem anexo'"
            size="xs"
            outline
            padding="xs"
            no-caps
            class="custom-btn-muted"
            :label="props.row.documentos"
            @click="downloadDocument(props.row.documentos)"
          />
          <span v-else class="text-muted" style="font-size: 10px">{{ props.row.documentos }}</span>
        </q-td>
      </template>
    </q-table>

    <div class="row justify-between items-center q-mt-md">
      <div class="row items-center">
        <span class="q-mr-sm text-muted">Itens por página:</span>
        <q-select
          dense
          outlined
          v-model="pagination.rowsPerPage"
          :options="[5, 10, 15, 20]"
          style="min-width: 80px"
          @update:model-value="updateRowsPerPage"
          dropdown-icon="keyboard_arrow_down"
        />
        <span class="q-ml-md text-caption text-grey-8">
          <!-- Mostrando {{ firstItemIndex }} a {{ lastItemIndex }} de -->
          Total de {{ filteredRows.length }} itens
        </span>
      </div>
      <div class="row justify-center q-mt-md">
        <q-pagination
          v-model="pagination.page"
          color="primary"
          :max="pagesNumber"
          :max-pages="6"
          size="sm"
          direction-links
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, defineComponent } from 'vue'

const columns = [
  {
    name: 'solicitado_em',
    label: 'Solicitado em',
    field: 'solicitado_em',
    sortable: true,
    align: 'left',
    headerStyle: 'text-align: start',
  },
  {
    name: 'limitado_ate',
    label: 'Limitado até',
    field: 'limitado_ate',
    sortable: true,
    align: 'left',
    headerStyle: 'text-align: start',
  },
  {
    name: 'tipo',
    label: 'Tipo',
    field: 'tipo',
    sortable: true,
    align: 'left',
    headerStyle: 'text-align: start',
  },
  {
    name: 'cliente',
    label: 'Cliente da transação',
    field: 'cliente',
    sortable: true,
  },
  {
    name: 'origem',
    label: 'Origem',
    field: 'origem',
    align: 'left',
  },
  {
    name: 'destino',
    label: 'Destino',
    field: 'destino',
    align: 'left',
  },
  {
    name: 'valor',
    label: 'Valor Movimentação R$',
    field: 'transactionValue',
    headerStyle: 'text-align: end',
    sortable: true,
    format: (val) =>
      `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  },
  {
    name: 'status',
    label: 'Status',
    field: 'status',
    align: 'left',
  },
  {
    name: 'documentos',
    label: 'Documentos',
    field: 'documentos',
    align: 'left',
  },
]

const rows = [
  {
    id: 1,
    solicitado_em: '10/04/2025 - 14:30',
    limitado_ate: '15/04/2025 - 23:59',
    tipo: 'Depósito',
    cliente: {
      name: 'Carlos Silva',
      avatar: 'https://sources.strategyanalytics.com.br/storage/users/default-avatar.png',
      email: 'carlos@gstrategyanalytics.com.br',
    },
    origem: 'Itaú',
    destino: 'N/A',
    transactionValue: 4500.0,
    status: 'Concluído: 10/04/2025 - 14:35',
    documentos: 'comprovante.pdf',
  },
  {
    id: 2,
    solicitado_em: '11/04/2025 - 09:15',
    limitado_ate: '16/04/2025 - 23:59',
    tipo: 'Transferência',
    cliente: {
      name: 'Ana Oliveira',
      avatar: 'https://sources.strategyanalytics.com.br/storage/users/default-avatar.png',
      email: 'ana@gstrategyanalytics.com.br',
    },
    origem: 'Bradesco',
    destino: 'Santander',
    transactionValue: 3200.5,
    status: 'Concluído: 11/04/2025 - 09:20',
    documentos: 'comprovante.pdf',
  },
  {
    id: 3,
    solicitado_em: '12/04/2025 - 16:45',
    limitado_ate: '17/04/2025 - 23:59',
    tipo: 'Saque',
    cliente: {
      name: 'Pedro Santos',
      avatar: 'https://sources.strategyanalytics.com.br/storage/users/default-avatar.png',
      email: 'pedro@gstrategyanalytics.com.br',
    },
    origem: 'Banco do Brasil',
    destino: 'N/A',
    transactionValue: 1500.0,
    status: 'Pendente',
    documentos: 'Sem anexo',
  },
  {
    id: 4,
    solicitado_em: '13/04/2025 - 11:20',
    limitado_ate: '18/04/2025 - 23:59',
    tipo: 'Saldo',
    cliente: {
      name: 'Mariana Costa',
      avatar: 'https://sources.strategyanalytics.com.br/storage/users/default-avatar.png',
      email: 'mariana@gstrategyanalytics.com.br',
    },
    origem: 'Nubank',
    destino: 'N/A',
    transactionValue: 7800.75,
    status: 'Concluído: 13/04/2025 - 11:25',
    documentos: 'extrato.pdf',
  },
  {
    id: 5,
    solicitado_em: '14/04/2025 - 13:10',
    limitado_ate: '19/04/2025 - 23:59',
    tipo: 'Transferência',
    cliente: {
      name: 'João Pereira',
      avatar: 'https://sources.strategyanalytics.com.br/storage/users/default-avatar.png',
      email: 'joao@gstrategyanalytics.com.br',
    },
    origem: 'Caixa Econômica',
    destino: 'Inter',
    transactionValue: 4200.0,
    status: 'Atrasado: 2 dias',
    documentos: 'contrato.docx',
  },
  {
    id: 6,
    solicitado_em: '15/04/2025 - 10:05',
    limitado_ate: '20/04/2025 - 23:59',
    tipo: 'Depósito',
    cliente: {
      name: 'Luiza Almeida',
      avatar: 'https://sources.strategyanalytics.com.br/storage/users/default-avatar.png',
      email: 'luiza@gstrategyanalytics.com.br',
    },
    origem: 'Santander',
    destino: 'N/A',
    transactionValue: 6300.25,
    status: 'Concluído: 15/04/2025 - 10:10',
    documentos: 'comprovante.pdf',
  },
  {
    id: 7,
    solicitado_em: '16/04/2025 - 15:30',
    limitado_ate: '21/04/2025 - 23:59',
    tipo: 'Saque',
    cliente: {
      name: 'Carlos Silva',
      avatar: 'https://sources.strategyanalytics.com.br/storage/users/default-avatar.png',
      email: 'carlos@gstrategyanalytics.com.br',
    },
    origem: 'Itaú',
    destino: 'N/A',
    transactionValue: 2000.0,
    status: 'Pendente',
    documentos: 'Sem anexo',
  },
  {
    id: 8,
    solicitado_em: '17/04/2025 - 08:45',
    limitado_ate: '22/04/2025 - 23:59',
    tipo: 'Transferência',
    cliente: {
      name: 'Ana Oliveira',
      avatar: 'https://sources.strategyanalytics.com.br/storage/users/default-avatar.png',
      email: 'ana@gstrategyanalytics.com.br',
    },
    origem: 'Bradesco',
    destino: 'Banco do Brasil',
    transactionValue: 5100.8,
    status: 'Concluído: 17/05/2025 - 08:50',
    documentos: 'comprovante.pdf',
  },
  {
    id: 9,
    solicitado_em: '18/04/2025 - 14:20',
    limitado_ate: '23/04/2025 - 23:59',
    tipo: 'Saldo',
    cliente: {
      name: 'Pedro Santos',
      avatar: 'https://sources.strategyanalytics.com.br/storage/users/default-avatar.png',
      email: 'pedro@gstrategyanalytics.com.br',
    },
    origem: 'Inter',
    destino: 'N/A',
    transactionValue: 9200.0,
    status: 'Concluído: 18/04/2025 - 14:25',
    documentos: 'extrato.pdf',
  },
  {
    id: 10,
    solicitado_em: '19/04/2025 - 11:15',
    limitado_ate: '24/04/2025 - 23:59',
    tipo: 'Depósito',
    cliente: {
      name: 'Mariana Costa',
      avatar: 'https://sources.strategyanalytics.com.br/storage/users/default-avatar.png',
      email: 'mariana@gstrategyanalytics.com.br',
    },
    origem: 'Nubank',
    destino: 'N/A',
    transactionValue: 3500.5,
    status: 'Concluído: 19/04/2025 - 11:20',
    documentos: 'identidade.jpg',
  },
  {
    id: 11,
    solicitado_em: '20/04/2025 - 16:40',
    limitado_ate: '25/04/2025 - 23:59',
    tipo: 'Transferência',
    cliente: {
      name: 'João Pereira',
      avatar: 'https://sources.strategyanalytics.com.br/storage/users/default-avatar.png',
      email: 'joaoa@gstrategyanalytics.com.br',
    },
    origem: 'Caixa Econômica',
    destino: 'Itaú',
    transactionValue: 2800.0,
    status: 'Atrasado: 1 dia',
    documentos: 'contrato.docx',
  },
  {
    id: 12,
    solicitado_em: '21/04/2025 - 09:25',
    limitado_ate: '26/04/2025 - 23:59',
    tipo: 'Saque',
    cliente: {
      name: 'Luiza Almeida',
      avatar: 'https://sources.strategyanalytics.com.br/storage/users/default-avatar.png',
      email: 'luiza@gstrategyanalytics.com.br',
    },
    origem: 'Santander',
    destino: 'N/A',
    transactionValue: 1200.0,
    status: 'Pendente',
    documentos: 'Sem anexo',
  },
]
export default defineComponent({
  name: 'TransactionHistoric',
  setup() {
    const selected = ref([])
    const filter = ref('')
    const loading = ref(false)
    const filterExpanded = ref(true)
    const pagination = ref({
      page: 1,
      rowsPerPage: 5,
      rowsNumber: 0,
    })

    // Opções para filtros
    const tiposOptions = ['Depósito', 'Transferência', 'Saque', 'Saldo']
    const statusOptions = ['Pendente', 'Concluído', 'Atrasado']

    // Modelos para filtros
    const filters = ref({
      tipo: [],
      status: [],
    })

    const dateRange = ref({
      solicitado: { from: '', to: '' },
      limitado: { from: '', to: '' },
    })

    // Função para converter data string para objeto Date
    const parseDate = (dateStr) => {
      if (!dateStr) return null
      // Se for um range (ex: "10/05/2025  a 15/05/2025 ")
      if (dateStr.includes(' a ')) {
        dateStr = dateStr.split(' a ')[0] // Pega a primeira data
      }
      const [datePart] = dateStr.split(' - ') // Remove hora se existir
      const [day, month, year] = datePart.split('/')
      return new Date(`${year}-${month}-${day}`)
    }

    // Filtra as linhas com base nos filtros aplicados
    const filteredRows = computed(() => {
      return rows.filter((row) => {
        // Filtro de pesquisa geral
        if (
          filter.value &&
          !Object.values(row).some((val) =>
            String(val).toLowerCase().includes(filter.value.toLowerCase()),
          )
        ) {
          return false
        }

        // Filtro por data de solicitação
        if (dateRange.value.solicitado.from && dateRange.value.solicitado.to) {
          const rowDate = parseDate(row.solicitado_em)
          const fromDate = parseDate(dateRange.value.solicitado.from)
          const toDate = parseDate(dateRange.value.solicitado.to)

          if (!rowDate || rowDate < fromDate || rowDate > toDate) {
            return false
          }
        }

        // Filtro por data limite
        if (dateRange.value.limitado.from && dateRange.value.limitado.to) {
          const rowDate = parseDate(row.limitado_ate)
          const fromDate = parseDate(dateRange.value.limitado.from)
          const toDate = parseDate(dateRange.value.limitado.to)

          if (!rowDate || rowDate < fromDate || rowDate > toDate) {
            return false
          }
        }

        // Filtro por tipo
        if (
          filters.value.tipo.length > 0 &&
          !filters.value.tipo.some((tipo) => row.tipo.includes(tipo))
        ) {
          return false
        }

        // Filtro por status
        if (
          filters.value.status.length > 0 &&
          !filters.value.status.some((status) => row.status.includes(status))
        ) {
          return false
        }

        return true
      })
    })

    // Calcula o número total de linhas para paginação
    const rowsNumber = computed(() => filteredRows.value.length)

    // Retorna apenas as linhas da página atual
    const paginatedRows = computed(() => {
      const start = (pagination.value.page - 1) * pagination.value.rowsPerPage
      const end = start + pagination.value.rowsPerPage
      return filteredRows.value.slice(start, end)
    })

    // Calcula o número total de páginas
    const pagesNumber = computed(() => {
      return Math.ceil(rowsNumber.value / pagination.value.rowsPerPage)
    })

    // Índices dos itens exibidos
    const firstItemIndex = computed(() => {
      return (pagination.value.page - 1) * pagination.value.rowsPerPage + 1
    })

    const lastItemIndex = computed(() => {
      const end = pagination.value.page * pagination.value.rowsPerPage
      return end > rowsNumber.value ? rowsNumber.value : end
    })

    // Função para limpar todos os filtros
    const clearFilters = () => {
      filter.value = ''
      filters.value = {
        tipo: [],
        status: [],
      }
      dateRange.value = {
        solicitado: { from: '', to: '' },
        limitado: { from: '', to: '' },
      }
      dateRangeInput.value = {
        solicitado: '',
        limitado: '',
      }
      pagination.value.page = 1
    }
    const clearSolicitado = () => {
      dateRange.value.solicitado = { from: '', to: '' }
      dateRangeInput.value.solicitado = ''
    }
    const clearLimitado = () => {
      dateRange.value.limitado = { from: '', to: '' }
      dateRangeInput.value.limitado = ''
    }
    // Função para determinar a cor do status
    const getStatusColor = (status) => {
      if (status.includes('Concluído')) return 'positive'
      if (status.includes('Atrasado')) return 'negative'
      if (status.includes('Pendente')) return 'warning'
      return 'grey'
    }

    const getClasseStatus = (status) => {
      if (status.includes('Concluído')) return 'custom-btn-primary'
      if (status.includes('Atrasado')) return 'custom-btn-negative'
      if (status.includes('Pendente')) return 'custom-btn-warning'
      return ''
    }

    // Função simulada para download de documento
    const downloadDocument = (filename) => {
      console.log(`Downloading ${filename}`)
      // Aqui você implementaria a lógica real de download
    }
    const updatePagination = (val) => {
      pagination.value = val
    }
    const updateRowsPerPage = (val) => {
      pagination.value.rowsPerPage = val
      pagination.value.page = 1
    }
    const dateRangeInput = ref({
      solicitado: '',
      limitado: '',
    })
    // Método para atualizar o texto do input
    const updateDateInput = (field) => {
      if (dateRange.value[field].from && dateRange.value[field].to) {
        dateRangeInput.value[field] =
          `${dateRange.value[field].from} a ${dateRange.value[field].to}`
      } else {
        dateRangeInput.value[field] = ''
      }
    }
    return {
      selected,
      columns,
      rows,
      filteredRows,
      paginatedRows,
      pagination,
      pagesNumber,
      filter,
      filters,
      dateRange,
      tiposOptions,
      statusOptions,
      filterExpanded,
      loading,
      firstItemIndex,
      lastItemIndex,
      getStatusColor,
      downloadDocument,
      clearFilters,
      updatePagination,
      updateRowsPerPage,
      updateDateInput,
      dateRangeInput,
      clearSolicitado,
      clearLimitado,
      getClasseStatus,

      getSelectedString() {
        return selected.value.length === 0
          ? ''
          : `${selected.value.length} registro${selected.value.length > 1 ? 's' : ''} selecionado${selected.value.length > 1 ? 's' : ''} de ${rowsNumber.value}`
      },
    }
  },
})
</script>

<style lang="sass">
.custom-btn-warning
  background-color: #FFD2881c !important
  color: #000 !important
  border: 1px solid #FFD288 !important
.custom-btn-primary
  background-color: #21ba451c !important
  color: #000 !important
  border: 1px solid #F1FDE8 !important
.custom-btn-negative
  background-color: #FF3D001c !important
  color: #000 !important
  border: 1px solid #FF3D00 !important
.custom-btn-muted
  background-color: #bdb4b41c !important
  color: #000 !important
  border: 1px solid #bdb4b4 !important
.q-btn--outline:before
  background-color: transparent !important
  border: 1px solid transparent !important
.my-sticky-header-column-table
  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #FAFAFA

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3
    font-weight: 700
    text-align: start
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
.q-table--dense .q-table__top
  padding: 6px 0px !important
.q-table--dense .q-table th:first-child, .q-table--dense .q-table td:first-child
  padding: 0px !important
.q-checkbox--dense .q-checkbox__inner
  width: 0.4em
  min-width: 0.1em
  height: 0.4em
</style>
