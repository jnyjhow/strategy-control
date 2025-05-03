<template>
  <q-card class="bg-grey-3 ContractDetailsCard q-pa-sm row" bordered flat>
    <q-item
      bordered
      clickable
      v-ripple
      class="rounded-borders col-3"
      :class="$q.dark.isActive ? 'bg-white text-white' : 'bg-white'"
      to="/contracts/logic"
    >
      <q-item-section avatar>
        <q-btn round flat color="grey-8" icon="description" unelevated />
        <!-- <q-avatar rounded>
          <q-icon name="description" />
        </q-avatar> -->
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-muted text-grey-9 text-h7"> Detalhes do Contrato </q-item-label>
      </q-item-section>
      <q-item-section side class="q-pa-none">
        <q-item-label class="text-info text-weight-bold"> Ver Contrato </q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ContractDetailsCard',
})
</script>
