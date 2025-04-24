<template>
  <q-card class="OpenDepositLayout">
    <q-card-section class="row justify-between">
      <div class="text-h6">Abrir Solicitação de Depósito</div>
      <q-btn v-close-popup flat icon="close" size="sm" rounded color="grey-6" />
    </q-card-section>
    <q-separator />
    <q-card-section class="row justify-between">
      <!-- Tipo de Movimentação -->
      <label-form className="q-mt-md q-px-sm col-md-6 col-12" textLabel="Tipo de Movimentação">
        <q-select
          outlined
          v-model="transactionType"
          :options="[{ label: 'Depósito', value: 'deposit' }]"
          emit-value
          map-options
          dense
          disable
          bg-color="grey-2"
          dropdown-icon="keyboard_arrow_down"
        />
      </label-form>
      <!-- Valor de Movimentação -->
      <label-form
        className="q-mt-md q-px-sm col-md-6 col-12"
        textLabel="Valor de Movimentação (R$)"
      >
        <q-input
          outlined
          v-model="transactionValue"
          type="text"
          dense
          mask="###.###.###.###,##"
          reverse-fill-mask
          unmasked-value
          @update:model-value="onInput"
        />
      </label-form>

      <!-- Cliente -->
      <label-form className="q-mt-md q-px-sm col-12" textLabel="Cliente">
        <q-select
          outlined
          v-model="selectedClient"
          :options="clients"
          emit-value
          map-options
          dense
          dropdown-icon="keyboard_arrow_down"
        />
      </label-form>

      <!-- Origem -->
      <label-form className="q-mt-md q-px-sm col-6" textLabel="Origem">
        <q-select
          outlined
          v-model="selectedBank"
          :options="banks"
          emit-value
          map-options
          dense
          dropdown-icon="keyboard_arrow_down"
        />
      </label-form>

      <!-- Destino -->
      <label-form className="q-mt-md col-6" textLabel="Destino">
        <q-select
          outlined
          v-model="selectedDestination"
          :options="[{ label: 'Carteira Disponível para Movimentar', value: 'movimentar' }]"
          emit-value
          map-options
          dense
          readonly
          disable
          bg-color="grey-2"
          dropdown-icon="keyboard_arrow_down"
        />
      </label-form>

      <!-- Upload de Comprovante -->
      <label-form
        className="q-mt-md col-12"
        textLabel="Documentos anexos - comprovante, recibo, etc.(opcional)"
      >
      </label-form>
      <q-btn
        label="Upload"
        color="primary"
        icon="upload"
        outline
        no-caps
        style="border-radius: 6px; border: 2px solid #00a3ff"
        @click="triggerFileInput"
      />
      <input
        type="file"
        ref="fileInput"
        style="display: none"
        @change="handleFileUpload"
        multiple
        accept=".jpg, .jpeg, .png, .pdf"
      />
      <div class="col-12" v-if="uploadedFiles.length > 0">
        <q-btn
          v-for="(item, index) in uploadedFiles"
          :key="index"
          size="sm"
          outline
          padding="xs"
          color="secondary"
          :label="item.name"
          no-caps
          border-radius="6px"
          class="q-ma-sm"
          style="border: 2px solid #00a3ff"
        />
      </div>
    </q-card-section>

    <!-- Botão de Enviar -->
    <div class="" style="position: absolute; bottom: 10px; right: 10px; width: 100%">
      <q-separator />
      <div class="row justify-end">
        <q-btn label="Voltar" color="primary" flat class="q-mt-md q-mr-sm" v-close-popup no-caps />
        <q-btn
          label="Enviar Solicitação de Depósito"
          color="primary"
          class="q-mt-md"
          no-caps
          style="border-radius: 8px"
          icon="add"
          @click="sendPasswordAction = true"
        />
      </div>
    </div>
    <q-dialog v-model="sendPasswordAction" persistent>
      <q-card class="q-dialog q-px-md">
        <q-card-section class="row justify-between" style="padding-inline: 0px">
          <div class="text-h7">Forneça sua Senha de Acesso para executar essa ação</div>
          <q-btn v-close-popup flat icon="close" size="sm" rounded color="grey-6" />
        </q-card-section>
        <q-separator />

        <div class="text-subtitle2 text-grey-6 q-mt-xs">
          Somente usuários permitidos podem executar essa ação.
        </div>
        <q-card-section style="padding-inline: 0px">
          <label-form textLabel="Senha para Edição" class="q-mt-md">
            <q-input outlined v-model="password" type="password" dense />
          </label-form>
        </q-card-section>
        <q-card-actions class="justify-end">
          <q-btn label="Cancelar" color="primary" flat @click="sendPasswordAction = false" />
          <q-btn label="Enviar" color="primary" @click="submitForm" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script setup>
import { ref, defineComponent } from 'vue'
defineComponent({
  name: 'OpenDepositLayout',
})
import LabelForm from 'components/Form/LabelForm.vue'
const transactionType = ref('deposit')
const transactionValue = ref(null)
const selectedClient = ref(null)
const selectedBank = ref(null)
const selectedDestination = ref('movimentar')
const uploadedFiles = ref([])
const sendPasswordAction = ref(false)
const password = ref('')

// Clientes fictícios
const clients = [
  { label: 'Cliente 1', value: 'client1' },
  { label: 'Cliente 2', value: 'client2' },
  { label: 'Cliente 3', value: 'client3' },
]

// Bancos tradicionais brasileiros
const banks = [
  { label: 'Selecione uma opção', value: null },
  { label: 'Banco Inter', value: 'banco_inter' },
  { label: 'Banco Original', value: 'banco_original' },
  { label: 'Banco Pan', value: 'banco_pan' },
  { label: 'Banco Safra', value: 'banco_safra' },
  { label: 'Banco do Brasil', value: 'banco_do_brasil' },
  { label: 'Itaú', value: 'itau' },
  { label: 'Santander', value: 'santander' },
  { label: 'Caixa Econômica Federal', value: 'caixa' },
  { label: 'Banco do Nordeste', value: 'banco_do_nordeste' },
  { label: 'Banco da Amazônia', value: 'banco_da_amazonia' },
  { label: 'Banco Votorantim', value: 'banco_votorantim' },
  { label: 'Banco BMG', value: 'banco_bmg' },
  { label: 'Banco ModalMais', value: 'banco_modalmais' },
  { label: 'Banco Daycoval', value: 'banco_daycoval' },
  { label: 'Banco Fibra', value: 'banco_fibra' },
  { label: 'Banco Mercantil do Brasil', value: 'banco_mercantil_do_brasil' },
  { label: 'Banco Rendimento', value: 'banco_rendimento' },
  { label: 'Banco Indusval', value: 'banco_indusval' },
  { label: 'Banco Alfa', value: 'banco_alfa' },
  { label: 'Banco Bonsucesso', value: 'banco_bonsucesso' },
  { label: 'Banco C6 Bank', value: 'c6_bank' },
  { label: 'Banco Neon', value: 'banco_neon' },
  { label: 'Banco Agibank', value: 'banco_agibank' },
  { label: 'Banco Intermedium', value: 'banco_intermedium' },
  { label: 'Banco Original', value: 'banco_original' },
  { label: 'Banco Panamericano', value: 'banco_panamericano' },
  { label: 'Banco do Brasil', value: 'banco_do_brasil' },
  { label: 'Bradesco', value: 'bradesco' },
]

// Destinos (preenchidos pelo usuário)
// const destinations = ref([])

// Função para aplicar a máscara de moeda
const onInput = (event) => {
  let value = event.replace(/\D/g, '') // Remove caracteres não numéricos
  if (!value) {
    transactionValue.value = ''
    return
  }
  value = (parseInt(value) / 100).toFixed(2) // Divide por 100 para obter os centavos
  transactionValue.value = value
    .toString()
    .replace('.', ',') // Substitui ponto por vírgula
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.') // Adiciona pontos como separadores de milhar
}
// Função para disparar o clique no input de arquivo
const triggerFileInput = () => {
  const fileInput = document.querySelector('input[type="file"]')
  if (fileInput) {
    fileInput.click()
  }
}
// Função para lidar com o upload de arquivos
const handleFileUpload = (event) => {
  const files = event.target.files
  if (files.length > 0) {
    uploadedFiles.value = Array.from(files)
    console.log('Arquivos selecionados:', uploadedFiles.value)
  }
}
// Função para enviar o formulário
const submitForm = () => {
  console.log({
    transactionType: transactionType.value,
    transactionValue: transactionValue.value,
    selectedClient: selectedClient.value,
    selectedBank: selectedBank.value,
    selectedDestination: selectedDestination.value,
    uploadedFiles: uploadedFiles.value,
  })
}
</script>
