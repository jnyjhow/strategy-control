<template>
  <div class="CustomersFormLayout">
    <div class="row q-gutter-sm justify-around">
      <label-form className="col" textLabel="Saldo em Contrato(R$)">
        <q-input
          outlined
          v-model="advisorEdit.customers.balance_contract"
          dense
          placeholder="value"
          class="q-my-sm"
          readonly
        ></q-input>
      </label-form>
      <label-form className="col" textLabel="Saldo de Clientes(R$)">
        <q-input
          outlined
          v-model="advisorEdit.customers.balance_customers"
          dense
          placeholder="value"
          class="q-my-sm"
          readonly
        ></q-input>
      </label-form>
    </div>
    <div class="row q-gutter-sm justify-around">
      <label-form className="col" textLabel="Clientes Capturados">
        <q-input
          outlined
          v-model="advisorEdit.customers.captured_customers"
          dense
          placeholder="value"
          class="q-my-sm"
          readonly
        ></q-input>
      </label-form>
      <label-form className="col" textLabel="Clientes Atrelados">
        <q-input
          outlined
          v-model="advisorEdit.customers.linked_customers"
          dense
          placeholder="value"
          class="q-my-sm"
          readonly
        ></q-input>
      </label-form>
    </div>
    <clients-table :columns="columnsClient" />
  </div>
</template>
<script setup>
import { defineComponent } from 'vue'
import { useAdvisorStore } from 'src/stores/advisor'
import { storeToRefs } from 'pinia'
import labelForm from 'src/components/Form/LabelForm.vue'
import ClientsTable from 'src/components/Table/Clients/ClientsTable.vue'
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
const advisorStore = useAdvisorStore()
const { advisorEdit } = storeToRefs(advisorStore)

defineComponent({
  name: 'CustomersFormLayout',
})
</script>
