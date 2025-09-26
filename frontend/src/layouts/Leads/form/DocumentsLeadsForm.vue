<template>
  <div class="DocumentsLeadsForm">
    <div class="row q-mb-md">
      <span class="text-bolder text-h7">Documentos Pessoais</span>
    </div>
    <div class="row q-gutter-sm justify-around">
      <label-form className="col" textLabel="RG">
        <q-input
          outlined
          v-model="leadEdit.cliente.rg"
          dense
          placeholder="value"
          class="q-my-sm"
          readonly
        ></q-input>
      </label-form>
      <label-form className="col" textLabel="CPF">
        <q-input
          outlined
          v-model="leadEdit.cliente.cpf"
          dense
          placeholder="value"
          class="q-my-sm"
        />
      </label-form>
      <label-form className="col" textLabel="CNH">
        <q-input
          outlined
          v-model="leadEdit.cliente.cnh"
          dense
          placeholder="value"
          class="q-my-sm"
        />
      </label-form>
    </div>
    <div class="row q-gutter-sm justify-around">
      <label-form className="col" textLabel="Email">
        <q-input
          outlined
          v-model="leadEdit.cliente.email"
          dense
          placeholder="value"
          class="q-my-sm"
          readonly
        />
      </label-form>
      <label-form className="col" textLabel="Telfone/Celular">
        <q-input
          outlined
          v-model="leadEdit.cliente.phone"
          dense
          placeholder="value"
          class="q-my-sm"
        />
      </label-form>
      <label-form className="col" textLabel="Data de Nascimento">
        <q-input
          outlined
          v-model="leadEdit.cliente.birth"
          dense
          type="date"
          placeholder="value"
          class="q-my-sm"
        />
      </label-form>
    </div>
    <div class="row q-gutter-sm justify-around">
      <label-form className="col" textLabel="Profissão">
        <q-input
          outlined
          v-model="leadEdit.cliente.email"
          dense
          placeholder="value"
          class="q-my-sm"
          readonly
        />
      </label-form>
      <label-form className="col" textLabel="Telfone/Celular">
        <q-input
          outlined
          v-model="leadEdit.cliente.phone"
          dense
          placeholder="value"
          class="q-my-sm"
        />
      </label-form>
      <label-form className="col" textLabel="Data de Nascimento">
        <q-input
          outlined
          v-model="leadEdit.cliente.birth"
          dense
          type="date"
          placeholder="value"
          class="q-my-sm"
        />
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
  </div>
</template>
<script setup>
import { defineComponent, ref } from 'vue'
import { useLeadStore } from 'src/stores/lead'
import { storeToRefs } from 'pinia'
import LabelForm from 'src/components/Form/LabelForm.vue'

defineComponent({
  name: 'DocumentsLeadsForm',
})
const leadStore = useLeadStore()
const { leadEdit } = storeToRefs(leadStore)

const uploadedFiles = ref([])
const uploadedCertidao = ref([])
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
</script>
