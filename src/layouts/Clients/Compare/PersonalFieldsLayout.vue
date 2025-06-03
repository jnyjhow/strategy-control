<template>
  <div class="row">
    <div class="col-12 q-px-md text-bold">Informações Básicas</div>
    <div
      class="row justify-center q-gutter-sm q-pa-md text-muted q-mt-xs"
      style="width: 250px; align-items: center"
    >
      <div class="col-12 self-center">
        <p class="text-compara">CPF</p>
      </div>
      <div class="col-12 self-end">
        <p class="text-compara">RG</p>
      </div>
      <div class="col-12 self-end">
        <p class="text-compara">Data de Nascimento</p>
      </div>
      <div class="col-12 self-end">
        <p class="text-compara">Email</p>
      </div>
      <div class="col-12 self-end">
        <p class="text-compara">Celular</p>
      </div>
      <div class="col-12 self-end">
        <p class="text-compara">Profissão</p>
      </div>
      <div class="col-12 self-end">
        <p class="text-compara">Renda</p>
      </div>
    </div>
    <div v-for="(item, index) in compare" :key="index" class="row">
      <!-- {{ item.cliente.nome }} -->
      <info-compare-layout
        v-if="item.id != 0"
        class="col-12 q-pa-md"
        :item_one="item.cliente.cpf"
        :item_two="item.cliente.rg"
        :item_three="item.cliente.birth"
        :item_four="item.cliente.email"
        :item_five="item.cliente.telefone"
        :item_six="item.cliente.profissao"
        :item_seven="item.cliente.renda"
      />
    </div>
  </div>
</template>
<script setup>
import InfoCompareLayout from './InfoCompareLayout.vue'
import { defineComponent } from 'vue'
import { useClientStore } from 'src/stores/client'
import { storeToRefs } from 'pinia'
const clientStore = useClientStore()
const { compare } = storeToRefs(clientStore)
defineComponent({
  name: 'PersonalFieldsLayout',
})
</script>
