<template>
  <div class="LeadsLayout">
    <title-page :breadcrumbs class="col-8 text-start">
      <div class="row justify-between">
        <div class="text-h6">Leads</div>
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
    <leads-table />
  </div>
</template>

<script setup>
import { defineComponent } from 'vue'
import TitlePage from 'src/components/TitlePage.vue'
import LeadsTable from 'src/components/Table/Leads/LeadsTable.vue'
defineComponent({
  name: 'LeadsLayout',
})
const breadcrumbs = [
  {
    label: 'Clientes',
  },
  {
    label: 'Lead',
  },
]
</script>
