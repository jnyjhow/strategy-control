<template>
  <q-card class="EditClientsLayout">
    <title-card
      :title="dialogOpengHeader"
      :advisor="advisorEdit.assessor ? advisorEdit.assessor.name : ''"
    />

    <q-separator></q-separator>

    <q-banner inline-actions rounded class="q-ma-md border-pattern">
      <div class="row">
        <div class="col-1">
          <q-avatar size="32px">
            <q-img
              :src="clientEdit.cliente.avatar"
              :alt="clientEdit.cliente.name"
              :title="clientEdit.cliente.name"
            />
          </q-avatar>
        </div>
        <div class="col-3">
          <span class="text-muted" style="font-size: 12px">ID #{{ clientEdit.id }}</span>
          <div class="">
            {{ clientEdit.cliente.name }}
          </div>
        </div>
        <div class="col">
          <q-btn
            size="sm"
            outline
            no-caps
            class="custom-btn-muted"
            :label="'Classificação: ' + clientEdit.level"
          />
          <q-btn
            flat
            round
            dense
            color="grey-6"
            icon="keyboard_arrow_down"
            @click.prevent="showLevelOptions = !showLevelOptions"
          />
          <q-menu v-model="showLevelOptions" self="top middle" square>
            <q-list style="min-width: 420px; padding-top: 2px">
              <q-item
                dense
                v-for="userClient in clientesSelected"
                :key="userClient"
                clickable
                @click="selectClient(userClient.id)"
                style="border-radius: 6px; margin-inline: 2px"
              >
                <q-item-section avatar>
                  <q-avatar size="32px">
                    <q-img
                      :src="userClient.avatar"
                      :alt="userClient.name"
                      :title="userClient.name"
                    />
                  </q-avatar>
                </q-item-section>
                <q-item-section align="left">
                  {{ userClient.name }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
      </div>
      <template v-slot:action>
        <q-btn
          outline
          color="primary"
          label="Comparar"
          no-caps
          size="sm"
          class="outline"
          :icon="$filtersString.resolveUrl('img:icons/replace.svg')"
          @click.prevent="showCompareOptions = !showCompareOptions"
        />

        <q-menu v-model="showCompareOptions" self="top middle" square>
          <q-list style="min-width: 420px; padding-top: 2px">
            <q-item
              dense
              v-for="userClient in clientesSelected"
              :key="userClient"
              clickable
              style="border-radius: 6px; margin-inline: 2px"
              @click="selectCompare(userClient.id)"
            >
              <q-item-section avatar>
                <q-avatar size="32px">
                  <q-img :src="userClient.avatar" :alt="userClient.name" :title="userClient.name" />
                </q-avatar>
              </q-item-section>
              <q-item-section align="left">
                {{ userClient.name }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
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
    </q-card-section>
    <q-card-actions vertical>
      <div class="row justify-end q-pa-md">
        <q-btn flat color="negative" class="q-mr-sm" icon="$filtersString.resolveUrl('img:icons/trash.svg')" label="Remover" @click.prevent="removeClient" />
        <q-btn flat color="primary" unelevated label="Salvar" @click.prevent="saveClient" />
      </div>
    </q-card-actions>
  </q-card>
</template>
<script setup>
import { defineComponent, ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useLayoutStore } from 'src/stores/layout'
import { useClientStore } from 'src/stores/client'
import { useAdvisorStore } from 'src/stores/advisor'
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
import useCliente from 'src/composables/Fakes/useCliente'
defineComponent({
  name: 'EditClientsLayout',
})

const layoutStore = useLayoutStore()
const clientStore = useClientStore()
const advisorStore = useAdvisorStore()
const { clientEdit, dialogOpengHeader } = storeToRefs(layoutStore)
const { advisorEdit } = storeToRefs(advisorStore)
const showLevelOptions = ref(false)
const showCompareOptions = ref(false)
const clienteApi = useCliente()
const { getClientIdName, getClient, createClient, updateClient, deleteClient } = clienteApi
const selectClient = (id) => {
  layoutStore.setClientEdit(getClient(id))
  showLevelOptions.value = false
}
const selectCompare = (id) => {
  const selectedClient = getClient(id)
  const currentClient = clientEdit.value
  clientStore.setCompare([currentClient, selectedClient])
  layoutStore.setDialogCompare(true)
  showCompareOptions.value = false
}
const clientesSelected = computed(() => {
  return getClientIdName()
})

// Save / Delete actions
const $q = useQuasar()

const saveClient = async () => {
  const payload = clientEdit.value || {}
  try {
    if (payload.id) {
      await updateClient(payload.id, payload)
      $q.notify({ message: 'Cliente atualizado com sucesso', color: 'positive' })
    } else {
      await createClient(payload)
      $q.notify({ message: 'Cliente criado com sucesso', color: 'positive' })
    }
    layoutStore.setClientDialog(false)
  } catch (err) {
    console.error('saveClient error', err)
    $q.notify({ message: err && err.message ? err.message : 'Erro ao salvar cliente', color: 'negative' })
  }
}

const removeClient = async () => {
  const payload = clientEdit.value || {}
  if (!payload.id) return
  try {
    await deleteClient(payload.id)
    $q.notify({ message: 'Cliente removido', color: 'positive' })
    layoutStore.setClientDialog(false)
  } catch (err) {
    console.error('removeClient error', err)
    $q.notify({ message: 'Erro ao remover cliente', color: 'negative' })
  }
}
</script>
