<template>
  <q-table
    :grid="$q.screen.xs"
    flat
    dense
    bordered
    :rows="rowLogic"
    :columns="columnsLogic"
    row-key="label"
    hide-header
    hide-pagination
    :pagination="pagination"
    class="ExpansiveLogic"
  >
    <template v-slot:body-cell-label="props">
      <q-td :props="props">
        <!-- <q-badge color="grey" text-color="white">{{ props.row.label }}</q-badge> -->
        {{ props.row.label }}
      </q-td>
    </template>
  </q-table>
</template>
<script setup>
import { defineComponent, ref } from 'vue'
import useLogic from 'src/composables/Fakes/useLogic'

const { columnsLogic, rowLogic } = useLogic()

defineComponent({
  name: 'ExpansiveLogic',
})
const pagination = ref({
  page: 1,
  rowsPerPage: 5,
  rowsNumber: 0,
})
</script>
<style lang="sass">
.ExpansiveLogic
  tr:first-child
    background-color: #f5f5f5
    color: #000
</style>
