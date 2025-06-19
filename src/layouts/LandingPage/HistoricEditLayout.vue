<template>
  <q-card class="HistoricEditLayout">
    <q-card-section class="row justify-between">
      <div class="text-h6">Historíco de Mudanças</div>
      <q-btn v-close-popup flat icon="close" size="sm" rounded color="grey-6" />
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="row align-center">
        <q-toggle
          v-model="select"
          label="Visualizar Mudanças por Seção:"
          left-label
          class="col-6 self-center"
          @update:model-value="listView = 'Selecione uma Seção'"
        />
        <q-select
          v-if="select"
          v-model="listView"
          :options="['Selecione uma Seção', 'Seção Principal', 'Segunda Seção']"
          placeholder="Selecione uma Seção"
          class="q-mt-md col"
          dense
          outlined
          dropdown-icon="keyboard_arrow_down"
          @geOptionValue="listHistoric = listHistoric.filter((item) => item.filter === value)"
        />
      </div>
    </q-card-section>

    <div class="" v-if="select && listView == 'Selecione uma Seção'">
      <p class="text-h6 text-bold q-pa-md">Selecione uma Seção para visualizar as mudanças</p>
    </div>
    <section-historic
      v-else
      v-for="(item, index) in selectList"
      :key="index"
      :description="item.description"
      :date="item.date"
      :status="item.status"
      :icon="item.icon"
      :color="item.color"
      :name="item.user.name"
      :avatar-color="item.avatarColor"
    />
  </q-card>
</template>

<script setup>
import { computed, defineComponent, ref } from 'vue'
import SectionHistoric from 'src/components/LandingPage/SectionHistoric.vue'

defineComponent({
  name: 'HistoricEditLayout',
})
// Seu código aqui

const select = ref(false)
const listView = ref('Selecione uma Seção')

const selectSection = (value) => {
  let lista = []
  if (value === 'Seção Principal') {
    lista = listHistoric.filter((item) => item.filter === 'Seção Principal')
  } else if (value === 'Segunda Seção') {
    lista = listHistoric.filter((item) => item.filter === 'Segunda Seção')
  } else {
    lista = [...listHistoric] // Reset to original list
  }
  return lista
}

const selectList = computed(() => selectSection(listView.value))

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
    icon: 'IconRocket',
    color: '#52C41A',
    avatarColor: 'green-11',
    filter: 'Seção Principal',
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
    icon: 'IconFileCheck',
    color: '#52C41A',
    avatarColor: 'green-11',
    filter: 'Seção Principal',
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
    icon: 'IconFileSearch',
    color: 'grey',
    avatarColor: 'grey-11',
    filter: 'Segunda Seção',
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
    icon: 'IconEdit',
    color: 'grey',
    avatarColor: 'grey-11',
    filter: 'Seção Principal',
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
    icon: 'iconFileAlert',
    color: 'red',
    avatarColor: 'red-2',
    filter: 'Segunda Seção',
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
    icon: 'IconFileSearch',
    color: 'grey',
    avatarColor: 'grey-11',
    filter: 'Segunda Seção',
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
    icon: 'IconEdit',
    color: 'grey',
    avatarColor: 'grey-11',
    filter: 'Segunda Principal',
  },
]
</script>

<style scoped>
/* Seus estilos aqui */
</style>
