<template>
  <div class="dividendLogicPage row items-start q-gutter-sm">
    <contract-details-card class="col-12" :item="linkItems">
      <transition name="fade" mode="out-in">
        <logic-dividend-filter v-if="paramentroLogic" />
      </transition>
    </contract-details-card>
    <div class="col-12 q-pa-sm text-info text-weight-bold text-end" style="text-align: end">
      ver historico
    </div>
    <div class="col-12">
      <expansive-logic />
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from 'vue'
import { useLayoutStore } from 'src/stores/layout'
import { storeToRefs } from 'pinia'
import ContractDetailsCard from 'src/components/Card/ContractDetailsCard.vue'
import ExpansiveLogic from 'src/components/Table/DividendLogic/ExpansiveLogicTable.vue'
import LogicDividendFilter from 'src/components/Form/LogicDividendFilter.vue'
defineComponent({
  name: 'ExpansaoLogicLayout',
})
const storeLayout = useLayoutStore()
const { paramentroLogic } = storeToRefs(storeLayout)
const linkItems = [
  {
    title: 'Detalhes do Contrato',
    icon: 'IconFileText',
    linkTo: '/contracts',
    linkText: 'Ver Contrato',
  },
  {
    title: 'Parâmentros de Lógica',
    icon: 'IconAdjustments',
    linkTo: '',
    linkText: 'Ver parâmetros',
  },
  {
    title: 'Projeção',
    icon: 'IconTimeline',
    selectd: true,
    linkTo: '',
    linkText: 'Ver parâmetros',
  },
]
</script>
