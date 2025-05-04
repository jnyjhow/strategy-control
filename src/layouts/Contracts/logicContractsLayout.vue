<template>
  <div class="LogicContractsLayout row items-start q-gutter-sm">
    <contract-details-card class="col-12" :item="linkItems">
      <transition name="fade" mode="out-in">
        <logic-parameters-filter v-if="paramentroLogic" />
      </transition>
    </contract-details-card>

    <div class="col-2 q-my-md" v-for="(item, index) in details" :key="index">
      <contract-values-card
        :title="item.title"
        :value="item.value"
        :icon-value="item.iconValue"
        :badge-text="item.badgeText"
        :badge-color="item.badgeColor"
        :bgColor="item.bgColor"
      />
    </div>
    <div class="col-12 q-pr-sm text-info text-weight-bold text-end" style="text-align: end">
      ver historico
    </div>
    <logic-contract-table class="col-12" />
  </div>
</template>

<script setup>
import { defineComponent } from 'vue'
import { useLayoutStore } from 'src/stores/layout'
import { storeToRefs } from 'pinia'
import LogicContractTable from 'src/components/Table/Contract/LogiccContractTable.vue'
import ContractDetailsCard from 'src/components/Card/ContractDetailsCard.vue'
import ContractValuesCard from 'src/components/Card/ContractValuesCard.vue'
import LogicParametersFilter from 'src/components/Form/LogicParametersFilter.vue'
defineComponent({
  name: 'LogicContractsLayout',
})
const storeLayout = useLayoutStore()
const { paramentroLogic } = storeToRefs(storeLayout)
const details = [
  {
    title: 'Valorização do ativo em 7 dias',
    iconValue: 'arrow_downward',
    iconColor: 'red',
    value: '3%',
    badgeText: '+2% vs. período anterior',
    badgeColor: 'negative',
    bgColor: 'primary',
  },
  {
    title: 'Valorização do ativo em 30 dias',
    iconValue: 'arrow_upward',
    iconColor: 'red',
    value: '3%',
    badgeText: '+2% período anterior',
    badgeColor: 'positive',
    bgColor: 'primary',
  },
  {
    title: 'Valorização do ativo em 30 dias',
    iconValue: 'arrow_upward',
    iconColor: 'green',
    value: '3%',
    badgeText: '+2% período anterior',
    badgeColor: 'positive',
    bgColor: 'primary',
  },
  {
    title: 'Intervalo de Oscilação',
    value: '30 min',
    bgColor: 'primary',
  },
]
const linkItems = [
  {
    title: 'Detalhes do Contrato',
    icon: 'description',
    linkTo: '/contracts',
    linkText: 'Ver Contrato',
  },
  {
    title: 'Parâmentros de Lógica',
    icon: 'fa-solid fa-sliders',
    linkTo: '',
    linkText: 'Ver parâmetros',
  },
  {
    title: 'Projeção',
    icon: 'timeline',
    selectd: true,
    linkTo: '',
    linkText: 'Ver parâmetros',
  },
]
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.9s ease-in;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
