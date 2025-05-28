<template>
  <div class="ClientsLayout">
    <title-page :breadcrumbs class="col-8 text-start">
      <div class="row justify-between">
        <div class="text-h6">Clientes</div>
        <q-btn
          class="q-mr-sm"
          color="primary"
          padding="sm sm"
          label="Criar Novo"
          icon="add"
          no-caps
          dense
          style="border-radius: 8px"
        />
      </div>
    </title-page>
    <clients-table />
  </div>
</template>
<script setup>
import TitlePage from 'src/components/TitlePage.vue'
import ClientsTable from 'src/components/Table/Clients/ClientsTable.vue'
import { defineComponent } from 'vue'
defineComponent({
  name: 'ClientsLayout',
})
const breadcrumbs = [
  {
    label: 'Clientes',
  },
  {
    label: 'Clientes',
  },
]
</script>
