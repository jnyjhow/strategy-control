<template>
  <q-card class="EditLeadLayout">
    <title-card :title="dialogOpengHeader" @on-close="onClose"></title-card>
    <q-separator />
    <q-banner inline-actions rounded class="q-ma-md border-pattern">
      <div class="row">
        <div class="col-1">
          <q-avatar size="32px">
            <q-img
              :src="leadEdit.cliente.avatar"
              :alt="leadEdit.cliente.name"
              :title="leadEdit.cliente.name"
            />
          </q-avatar>
        </div>
        <div class="col-3">
          <span class="text-muted" style="font-size: 12px">ID #{{ leadEdit.id }}</span>
          <div class="">
            {{ leadEdit.cliente.name }}
          </div>
        </div>
        <div class="col-1">
          <q-btn
            size="xs"
            outline
            padding="xs"
            no-caps
            class="custom-btn-muted"
            :label="leadEdit.estagio_lead"
          />
        </div>
        <div class="col">
          <q-btn flat round dense color="grey-6" icon="keyboard_arrow_down">
            <q-menu v-model="optionsMenu" self="top middle" square>
              <q-list style="min-width: 320px; padding-top: 2px">
                <q-item
                  dense
                  v-for="lead in leadSelected"
                  :key="lead"
                  clickable
                  @click="setLead(lead.value)"
                  style="border-radius: 6px; margin-inline: 2px"
                >
                  <q-item-section avatar>
                    <q-avatar size="32px">
                      <q-img :src="lead.avatar" :alt="lead.name" :title="lead.name" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section align="left">
                    {{ lead.label }}
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
      <template v-slot:action>
        <q-btn flat size="xs" :icon="$filtersString.resolveUrl('img:icons/edit.svg')" />
        <q-btn flat size="xs" :icon="$filtersString.resolveUrl('img:icons/trash.svg')" />
      </template>
    </q-banner>
    <q-card-section>
      <documents-leads-form />
      <banks-leads-layout />
      <residencial-leads-layout />
      <upload-residencial-leads-layout />
      <documents-p-f-leads-layout />
      <documents-persona-leads-form />
      <address-leads-table />
      <partner-leads-table />
      <related-leads-table />
    </q-card-section>
  </q-card>
</template>
<script setup>
import { defineComponent, computed, ref } from 'vue'
import { useLayoutStore } from 'src/stores/layout'
import { useLeadStore } from 'src/stores/lead'
import { storeToRefs } from 'pinia'
import useLeads from 'src/composables/Fakes/useLeads'
import TitleCard from 'src/components/Card/TitleCard.vue'
import DocumentsLeadsForm from './form/DocumentsLeadsForm.vue'
import BanksLeadsLayout from './form/BanksLeadsLayout.vue'
import ResidencialLeadsLayout from './form/ResidencialLeadsLayout.vue'
import UploadResidencialLeadsLayout from './form/UploadResidencialLeadsLayout.vue'
import DocumentsPFLeadsLayout from './form/DocumentsPFLeadsLayout.vue'
import DocumentsPersonaLeadsForm from './form/DocumentsPersonaLeadsForm.vue'
import AddressLeadsTable from 'src/components/Table/Leads/AddressLeadsTable.vue'
import PartnerLeadsTable from 'src/components/Table/Leads/PartnerLeadsTable.vue'
import RelatedLeadsTable from 'src/components/Table/Leads/RelatedLeadsTable.vue'

const optionsMenu = ref(false)

const layoutStore = useLayoutStore()
const leadStore = useLeadStore()
const { leadEdit } = storeToRefs(leadStore)
const { dialogOpengHeader } = storeToRefs(layoutStore)
const { getLeadOptions, getClientLead } = useLeads()

const setLead = (id) => {
  console.log('setLead', id)
  leadStore.setLeadEdit(getClientLead(id))
  optionsMenu.value = false
}

const onClose = () => {
  console.log('onClose')
  leadStore.setLeadEdit({})
}
defineComponent({
  name: 'EditLeadLayout',
})
const leadSelected = computed(() => {
  return getLeadOptions()
})
</script>
