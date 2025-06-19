<template>
  <q-card class="HistoricEditLayout">
    <q-card-section class="row justify-between">
      <div class="text-h6">Historíco de Mudanças</div>
      <q-btn v-close-popup flat icon="close" size="sm" rounded color="grey-6" />
    </q-card-section>
    <q-separator />
    <section-historic
      v-for="(item, index) in listHistoric"
      :key="index"
      :description="item.description"
      :date="item.date"
      :status="item.status"
      :icon="item.icon"
    />
  </q-card>
</template>

<script setup>
import { defineComponent } from 'vue'
import SectionHistoric from 'src/components/LandingPage/SectionHistoric.vue'

defineComponent({
  name: 'HistoricEditLayout',
})
// Seu código aqui

const listHistoric = [
  {
    id: 1,
    date: '21/06/2025 10:24',
    description: 'Edições publicadas!',
    user: {
      name: 'João',
      role: 'Assessor',
    },
    status: 'approved',
    icon: 'rocket',
    color: 'green',
  },
  {
    id: 2,
    date: '21/06/2025 10:24',
    description: 'Edições Aprovadas!',
    user: {
      name: 'João',
      role: 'Assessor',
    },
    status: 'approved',
    icon: 'documentCheck',
    color: 'green',
  },
  {
    id: 1,
    date: '21/06/2025 10:24',
    description: 'Enviado para Revisão e Aprovação!',
    user: {
      name: 'João',
      role: 'Assessor',
    },
    status: 'approved',
    icon: 'rocket',
    color: 'green',
  },
  {
    id: 3,
    date: '19/06/2025 10:24',
    description: '5 campos editados',
    user: {
      name: 'João',
      role: 'Assessor',
    },
    status: 'pending',
    icon: 'edit',
    color: 'grey',
  },
  {
    id: 4,
    date: '19/06/2025 10:24',
    description: 'Edições Reprovadas!',
    user: {
      name: 'João',
      role: 'Assessor',
    },
    status: 'rejected',
    icon: 'documentAlert',
    color: 'negative',
  },
  {
    id: 5,
    date: '21/06/2025 10:24',
    description: 'Enviado para Revisão e Aprovação!',
    user: {
      name: 'João',
      role: 'Assessor',
    },
    status: 'approved',
    icon: 'rocket',
    color: 'green',
  },
  {
    id: 6,
    date: '21/06/2025 10:24',
    description: '3 campos editados',
    user: {
      name: 'João',
      role: 'Assessor',
    },
    status: 'pending',
    icon: 'edit',
    color: 'green',
  },
]
</script>

<style scoped>
/* Seus estilos aqui */
</style>
