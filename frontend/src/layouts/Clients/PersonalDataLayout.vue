<template>
  <q-form class="PersonalDataLayout">
    <div class="row q-gutter-sm justify-around">
      <label-form className="col" textLabel="RG">
        <q-input
          outlined
          v-model="clientEdit.cliente.rg"
          dense
          placeholder="value"
          class="q-my-sm"
        ></q-input>
      </label-form>
      <label-form className="col" textLabel="CPF">
        <q-input
          outlined
          v-model="clientEdit.cliente.cpf"
          dense
          placeholder="value"
          class="q-my-sm"
        ></q-input>
      </label-form>
      <label-form className="col" textLabel="CNH">
        <q-input
          outlined
          v-model="clientEdit.cliente.cnh"
          dense
          placeholder="value"
          class="q-my-sm"
        ></q-input>
      </label-form>
    </div>
    <div class="row q-gutter-sm justify-around">
      <label-form className="col" textLabel="Emal">
        <q-input
          outlined
          v-model="clientEdit.cliente.email"
          dense
          placeholder="value"
          class="q-my-sm"
        ></q-input>
      </label-form>
      <label-form className="col" textLabel="Telefone/Celular">
        <q-input
          outlined
          v-model="clientEdit.cliente.telefone"
          dense
          placeholder="000 0000-0000"
          class="q-my-sm"
        ></q-input>
      </label-form>
      <label-form className="col" textLabel="Data de Nascimento">
        <q-input
          outlined
          v-model="clientEdit.cliente.birth"
          navigation-min-year-month="1990/07"
          type="date"
          dense
          placeholder="value"
          class="q-my-sm"
        ></q-input>
      </label-form>
    </div>
    <div class="row justify-around q-gutter-sm">
      <label-form className="col" textLabel="Profissão">
        <q-select
          outlined
          v-model="clientEdit.cliente.profissao"
          :options="optionsProfission"
          dense
          placeholder="Selecione a profissão"
          class="q-my-sm"
        ></q-select>
      </label-form>
      <label-form className="col" textLabel="Renda Anual">
        <q-select
          outlined
          v-model="clientEdit.cliente.rendaAnual"
          :options="rendaAnual"
          dense
          placeholder="Selecione a renda anual"
          class="q-my-sm"
        ></q-select>
      </label-form>
    </div>

    <!-- Upload de Comprovante -->
    <label-form className="q-mt-sm " textLabel="Comprovante de Endereço"> </label-form>

    <div class="row q-gutter-sm justify-between q-mt-xs">
      <q-btn
        label="Upload"
        color="primary"
        icon="upload"
        outline
        no-caps
        style="border-radius: 6px; border: 2px solid #00a3ff"
        @click="triggerFileInput"
      />
      <div class="" v-if="uploadedFiles.length > 0">
        <q-btn
          v-for="(item, index) in uploadedFiles"
          :key="index"
          size="sm"
          outline
          padding="xs"
          icon="description"
          color="secondary"
          :label="item.name"
          no-caps
          class="q-ma-sm text-muted"
        />
        <q-icon
          :name="$filtersString.resolveUrl('img:icons/trash.svg')"
          size="0.8rem"
          class="text-muted"
          color="grey-4"
        />
      </div>
      <input
        type="file"
        ref="fileInput"
        style="display: none"
        @change="handleFileUpload"
        multiple
        accept=".jpg, .jpeg, .png, .pdf"
        class="col"
      />
    </div>
    <div class="row q-gutter-sm justify-between q-mt-xs">
      <q-btn
        label="Upload"
        color="primary"
        icon="upload"
        outline
        no-caps
        style="border-radius: 6px; border: 2px solid #00a3ff"
        @click="triggerFileInputCertidao"
      />
      <div class="" v-if="uploadedCertidao.length > 0">
        <q-btn
          v-for="(item, index) in uploadedCertidao"
          :key="index"
          size="sm"
          outline
          padding="xs"
          icon="description"
          color="secondary"
          :label="item.name"
          no-caps
          class="q-ma-sm text-muted"
        />
        <q-icon
          :name="$filtersString.resolveUrl('img:icons/trash.svg')"
          size="0.8rem"
          class="text-muted"
          color="grey-4"
        />
      </div>
      <input
        type="file"
        style="display: none"
        @change="handleFileCertidao"
        multiple
        accept=".jpg, .jpeg, .png, .pdf"
        class="col-2"
      />
    </div>
  </q-form>
</template>
<script setup>
import labelForm from 'src/components/Form/LabelForm.vue'
import { defineComponent, ref } from 'vue'
import { useLayoutStore } from 'src/stores/layout'
import { storeToRefs } from 'pinia'

const layoutStore = useLayoutStore()
const { clientEdit } = storeToRefs(layoutStore)
const uploadedFiles = ref([])
const uploadedCertidao = ref([])
const optionsProfission = [
  { label: 'Engenheiro', value: 'engenheiro' },
  { label: 'Médico', value: 'medico' },
  { label: 'Professor', value: 'professor' },
  { label: 'Advogado', value: 'advogado' },
  { label: 'Outro', value: 'outro' },
]
const rendaAnual = [
  { label: 'Até R$ 50.000,00', value: 'ate_50000' },
  { label: 'De R$ 50.000,00 a R$ 100.000,00', value: 'de_50000_a_100000' },
  { label: 'De R$ 100.000,00 a R$ 200.000,00', value: 'de_100000_a_200000' },
  { label: 'De R$ 200.000,00 a R$ 500.000,00', value: 'de_200000_a_500000' },
  { label: 'Acima de R$ 500.000,00', value: 'acima_de_500000' },
  { label: 'Não Informar', value: 'nao_informar' },
]
// Função para disparar o clique no input de arquivo
const triggerFileInput = () => {
  const fileInput = document.querySelector('input[type="file"]')
  if (fileInput) fileInput.click()
}

const triggerFileInputCertidao = () => {
  const fileInputs = document.querySelectorAll('input[type="file"]')
  const fileInput = fileInputs[fileInputs.length - 1]
  if (fileInput) fileInput.click()
}

// Função para lidar com o upload de arquivos
const handleFileUpload = (event) => {
  const files = event.target.files
  if (files.length > 0) {
    uploadedFiles.value = Array.from(files)
    console.log('Arquivos selecionados:', uploadedFiles.value)
  }
}
// Função para lidar com o upload de arquivos
const handleFileCertidao = (event) => {
  const files = event.target.files
  if (files.length > 0) {
    uploadedCertidao.value = Array.from(files)
    console.log('Arquivos selecionados:', uploadedFiles.value)
  }
}
defineComponent({
  name: 'PersonalDataLayout',
})
</script>
