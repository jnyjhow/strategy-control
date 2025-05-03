<template>
  <div class="ContractLogicPage">
    <title-page title="Lógica de Contratos" :breadcrumbs />
    <div class="q-pt-md q-pl-md row">
      <div class="col-12">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey col-12"
          active-color="primary"
          indicator-color="primary"
          inline-label
          align="left"
        >
          <q-tab no-caps name="expansao" label="Expansão de Patrimônio" />
          <q-tab no-caps name="aposentadoria" label="Fundo de Aposentadoria" />
          <q-tab no-caps name="liquidez" label="Fundo de Liquidez Elevada" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="expansao">
            <logic-contracts-layout />
          </q-tab-panel>

          <q-tab-panel name="aposentadoria">
            <p>estou no segundo</p>
          </q-tab-panel>

          <q-tab-panel name="liquidez">
            <p>estou no terceiro</p>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import TitlePage from 'src/components/TitlePage.vue'
import LogicContractsLayout from 'src/layouts/Contracts/logicContractsLayout.vue'
const tab = ref('expansao')
const breadcrumbs = [
  {
    label: 'Contratos',
  },
  {
    label: 'Lógica de Contratos',
  },
]
</script>
