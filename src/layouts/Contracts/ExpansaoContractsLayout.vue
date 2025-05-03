<template>
  <div class="ExpansaoContractsLayout row items-start q-gutter-sm">
    <contract-details-card class="col-12" />
    <div class="col q-my-md" v-for="(item, index) in details" :key="index">
      <contract-values-card
        :title="item.title"
        :value="item.value"
        :icon-value="item.iconValue"
        :badge-text="item.badgeText"
        :badge-color="item.badgeColor"
        :bgColor="item.bgColor"
      />
    </div>
    <div class="col-12 q-pa-sm text-info text-weight-bold text-end" style="text-align: end">
      ver historico
    </div>
    <expansao-contract-table class="col-12" />
  </div>
</template>

<script setup>
import { defineComponent } from 'vue'
import ExpansaoContractTable from 'src/components/Table/Contract/ExpansaoContractTable.vue'
import ContractDetailsCard from 'src/components/Card/ContractDetailsCard.vue'
import ContractValuesCard from 'src/components/Card/ContractValuesCard.vue'
defineComponent({
  name: 'ExpansaoContractsLayout',
})
const details = [
  {
    title: 'Início e Fim de Contrato',
    value: '05/10/25 - 10/10/25',
    bgColor: 'primary',
  },
  {
    title: 'Vigência Remanescente',
    value: '5 dias',
    bgColor: 'primary',
  },
  {
    title: 'Lógica de Contrato Atrelada',
    value: '',
    badgeText: 'Lógica Contrato ABC',
    bgColor: 'primary',
  },
  {
    title: 'Lógica de Dividendo Atrelada',
    value: '',
    badgeText: 'Lógica Contrato ABC',
    bgColor: 'primary',
  },
  {
    title: 'V. do ativo em 30 dias',
    iconValue: 'arrow_downward',
    iconColor: 'negative',
    value: '3%',
    badgeText: '+2% período anterior',
    badgeColor: 'negative',
    bgColor: 'primary',
  },
  {
    title: 'V. do ativo em 90 dias',
    iconValue: 'arrow_upward',
    iconColor: 'positive',
    value: '3%',
    badgeText: '+2% período anterior',
    badgeColor: 'positive',
    bgColor: 'primary',
  },
  {
    title: 'Valorização do ativo em 1 ano',
    iconValue: 'arrow_upward',
    iconColor: 'positive',
    value: '3%',
    badgeText: '+2% período anterior',
    badgeColor: 'positive',
    bgColor: 'primary',
  },
]
</script>
