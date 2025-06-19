<template>
  <q-card class="SectionLPLayout" flat style="display: grid; gap: 24px">
    <div class="row justify-between q-pa-md align-center section-editor-pai">
      <p class="text-h6 text-bold">Seção Principal</p>
      <section-editor
        class="col-12 section"
        v-for="(section, index) in sections"
        :key="index"
        :title="section.title"
        :isActive="activeSection === section.type"
        @select="actionSelected(section.type)"
        @closed="activeSection = null"
      >
        <div v-if="section.type === 'paramentros'">
          <main-title />
        </div>

        <div v-else-if="section.type === 'titulo-principal'">
          <main-title />
        </div>
        <div v-else-if="section.type === 'text-corpo'">
          <main-title />
        </div>
        <div v-else-if="section.type === 'botao-action'">
          <main-title />
        </div>
      </section-editor>
    </div>
    <div class="row justify-between q-pa-md align-center section-editor-pai">
      <p class="text-h6 text-bold">Segunda Seção</p>
      <section-editor
        class="col-12 section"
        v-for="(section, index) in sectionsSecond"
        :key="index"
        :title="section.title"
        :isActive="activeSection === section.type"
        @select="actionSelected(section.type)"
        @closed="activeSection = null"
      >
        <div v-if="section.type === 'paramentros-second'">
          <main-title />
        </div>

        <div v-else-if="section.type === 'titulo-principal-second'">
          <main-title />
        </div>
        <div v-else-if="section.type === 'text-corpo-second'">
          <main-title />
        </div>
        <div v-else-if="section.type === 'botao-action-second'">
          <main-title />
        </div>
      </section-editor>
    </div>

    <q-dialog v-model="sendPasswordAction" persistent>
      <password-confirm
        title="Forneça sua Senha de Acesso para Habilitar a Edição"
        @passwordSubmitted="submitForm"
        @cancel="sendPasswordAction = false"
      />
    </q-dialog>
  </q-card>
</template>
<script setup>
import { defineComponent, ref } from 'vue'
import SectionEditor from 'src/components/LandingPage/SectionEditor.vue'
import MainTitle from 'src/components/Form/LandingPage/MainTitle.vue'
import PasswordConfirm from 'src/components/Auth/PasswordConfirm.vue'
import { useAuthStore } from 'src/stores/auth'
import { storeToRefs } from 'pinia'

defineComponent({
  name: 'SectionLPLayout',
})
const activeSection = ref(null)
const sendPasswordAction = ref(false)
const storeAuth = useAuthStore()
const { auth } = storeToRefs(storeAuth)
const actionSelected = (type) => {
  activeSection.value = type
  if (!auth.value.password) {
    sendPasswordAction.value = true
  }

  console.log(`Ação selecionada: ${type}`)
}
const sections = ref([
  {
    title: 'Parâmetros da Seção',
    type: 'paramentros',
  },
  {
    title: 'Titulo Principal',
    type: 'titulo-principal',
  },
  {
    title: 'Texto de corpo',
    type: 'text-corpo',
  },
  {
    title: 'Botão de Ação',
    type: 'botao-action',
  },
])
const submitForm = (value) => {
  sendPasswordAction.value = false
  auth.value.password = value
  console.log('Formulário enviado com sucesso!' + value)
}
const sectionsSecond = ref([
  {
    title: 'Parâmetros da Seção',
    type: 'paramentros-second',
  },
  {
    title: 'Titulo Principal',
    type: 'titulo-principal-second',
  },
  {
    title: 'Texto de corpo',
    type: 'text-corpo-second',
  },
])
</script>
<style scoped>
.section {
  cursor: url('/icons/cursor.png'), pointer !important;
}
.section-editor-pai {
  box-shadow:
    0 1px 5px rgba(0, 0, 0, 0.2),
    0 2px 2px rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12) !important;
  border-radius: 4px !important;
  background: #fff !important;
}
</style>
