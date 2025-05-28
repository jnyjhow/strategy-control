<template>
  <q-card class="EditClientsLayout">
    <title-card :title="dialogOpengHeader" />

    <q-separator></q-separator>

    <q-banner inline-actions rounded class="q-ma-md border-pattern">
      <q-item>
        <q-item-section avatar>
          <q-avatar size="32px">
            <q-img
              :src="clientEdit.cliente.avatar"
              :alt="clientEdit.cliente.name"
              :title="clientEdit.cliente.name"
            />
          </q-avatar>
        </q-item-section>
        <q-item-section align="left">
          <q-item-label caption> ID #{{ clientEdit.id }} </q-item-label>
          <q-item-label>
            {{ clientEdit.cliente.name }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <template v-slot:action>
        <q-btn
          outline
          color="primary"
          label="Comparar"
          no-caps
          size="sm"
          class="outline"
          :icon="$filtersString.resolveUrl('img:icons/replace.svg')"
        />

        <q-btn flat size="xs" :icon="$filtersString.resolveUrl('img:icons/edit.svg')" />
        <q-btn flat size="xs" :icon="$filtersString.resolveUrl('img:icons/trash.svg')" />
      </template>
    </q-banner>
    <q-card-section>
      <div class="text-h7 text-bold">Informações e Documentos Pessoais</div>
      <personal-data-layout class="q-my-lg" />
      <div class="text-h7 text-bold">Dados Bancários</div>
      <bank-details-layout class="q-my-lg" />
      <div class="text-h7 text-bold">Documentos Residencias</div>
      <data-residential-layout class="q-my-lg" />
      <upload-residential-layout class="q-my-lg" />
      <div class="text-h7 text-bold q-mt-lg">Documentos Contábeis de Pessoa Física</div>
      <upload-documents-layout class="q-my-lg" />
      <div class="text-h7 text-bold q-mt-lg">Documentos Contábeis de Pessoa Jurídica</div>
      <upload-persona-layout class="q-my-lg" />
      <div class="text-h7 text-bold q-mt-lg">Investimento</div>
      <investment-form-layout class="q-my-lg" />
      <div class="text-h7 text-bold q-mt-lg">Contratos</div>
      <contract-client-table class="q-my-lg" />
      <div class="text-h7 text-bold q-mt-lg">Empréstimo</div>
      <we-lend-form-layout class="q-my-lg" />
      {{ clientEdit.bankRegister }}
    </q-card-section>
    <q-card-actions vertical> </q-card-actions>
  </q-card>
</template>
<script setup>
import { defineComponent } from 'vue'
import { useLayoutStore } from 'src/stores/layout'
import { storeToRefs } from 'pinia'
import TitleCard from 'src/components/Card/TitleCard.vue'
import PersonalDataLayout from 'src/layouts/Clients/PersonalDataLayout.vue'
import BankDetailsLayout from 'src/layouts/Clients/BankDetailsLayout.vue'
import DataResidentialLayout from 'src/layouts/Clients/DataResidentialLayout.vue'
import UploadResidentialLayout from 'src/layouts/Clients/Form/UploadResidentialLayout.vue'
import UploadDocumentsLayout from 'src/layouts/Clients/Form/UploadDocumentsLayout.vue'
import UploadPersonaLayout from 'src/layouts/Clients/Form/UploadPersonaLayout.vue'
import InvestmentFormLayout from 'src/layouts/Clients/Form/InvestmentFormLayout.vue'
import WeLendFormLayout from 'src/layouts/Clients/Form/WeLendFormLayout.vue'
import ContractClientTable from 'src/components/Table/Clients/ContractClientTable.vue'
defineComponent({
  name: 'EditClientsLayout',
})

const layoutStore = useLayoutStore()
const { clientEdit, dialogOpengHeader } = storeToRefs(layoutStore)
</script>
