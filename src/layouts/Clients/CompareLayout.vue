<template>
  <q-card class="CompareLayout">
    <q-icon name=""></q-icon>
    <title-card :title="dialogOpengHeader" @on-close="onClose" />
    <q-separator />
    <q-banner inline-actions rounded class="q-ma-md">
      <div class="row q-gutter-sm">
        <div class="col">
          <label-form textLabel="Dados comparados">
            <q-select
              outlined
              dense
              :options="optionsCompare"
              v-model="option"
              class="q-my-sm"
              options-dense
              menu-shrink
              popup-content-class="q-pa-xs"
              options-selected-class="bg-grey-2 text-gray-1"
            ></q-select>
          </label-form>
        </div>
        <div
          class="row self-center"
          v-for="(item, index) in compare"
          :key="index"
          style="background-color: #fafafa"
        >
          <client-simple
            class="col border-gray"
            style="max-width: 18rem"
            v-if="item.cliente"
            :id="item.id"
            :avatar="item.cliente.avatar"
            :name="item.cliente.name"
            :level="item.level"
          />
          <div class="col" v-else>
            <q-banner class="bg-grey-2 border-gray text-grey-8 col" rounded>
              <div class="text-center row">
                <add-client-compare />
                <q-btn
                  @click.prevent.stop="removeEmpty"
                  flat
                  size="xs"
                  :icon="$filtersString.resolveUrl('img:icons/trash.svg')"
                />
              </div>
            </q-banner>
          </div>
        </div>
        <div class="col self-center">
          <q-btn
            outline
            color="primary"
            no-caps
            size="sm"
            padding="xs xs"
            class="outline"
            icon="add"
            @click.prevent="sendEmptyArray"
            :disabled="arrayEmpty"
          />
        </div>
      </div>
    </q-banner>
    <personal-fields-layout v-if="option.value == 'personal' || option.value == 'all'" />
    <investiment-fields-layout v-if="option.value == 'all' || option.value == 'investment'" />
    <loan-fields-layout v-if="option.value == 'all' || option.value == 'loan'" />
    <!-- {{ compare }} -->
  </q-card>
</template>
<script setup>
import { defineComponent, onMounted, ref } from 'vue'
import { useLayoutStore } from 'src/stores/layout'
import { useClientStore } from 'src/stores/client'
import { storeToRefs } from 'pinia'
import LabelForm from 'src/components/Form/LabelForm.vue'
import TitleCard from 'src/components/Card/TitleCard.vue'
import ClientSimple from 'src/components/Card/ClientSimple.vue'
import AddClientCompare from 'src/components/Form/AddClientCompare.vue'
import PersonalFieldsLayout from './Compare/PersonalFieldsLayout.vue'
import InvestimentFieldsLayout from './Compare/InvestimentFieldsLayout.vue'
import LoanFieldsLayout from './Compare/LoanFieldsLayout.vue'
const layoutStore = useLayoutStore()
const clientStore = useClientStore()
const { compare } = storeToRefs(clientStore)
const { dialogOpengHeader } = storeToRefs(layoutStore)
const option = ref({ label: 'Todos os dados', value: 'all' })
const arrayEmpty = ref(false)
const sendEmptyArray = () => {
  if (!arrayEmpty.value) {
    clientStore.setCompare([{ id: 0, value: 'empty' }])
    arrayEmpty.value = true
  }
}
const removeEmpty = () => {
  clientStore.setRemoveEmpty()
  arrayEmpty.value = false
}
const onClose = () => {
  console.log('onClose')
  clientStore.setClearCompare()
}
const optionsCompare = [
  { label: 'Mais relevantes', value: 'hard' },
  { label: 'Todos os dados', value: 'all' },
  { label: 'Dados Pessoais', value: 'personal' },
  { label: 'Dados de investimento', value: 'investment' },
  { label: 'Dados de Empréstimo', value: 'loan' },
]
defineComponent({
  name: 'CompareLayout',
})
onMounted(() => {
  layoutStore.setDialogOpengHeader('Compararação de Clientes')
})
</script>
