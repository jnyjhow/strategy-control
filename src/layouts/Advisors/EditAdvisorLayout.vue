<template>
  <q-card class="EditAdvisorLayout">
    <title-card :title="dialogOpengHeader" @on-close="onClose"></title-card>
    <q-separator />
    <q-banner inline-actions rounded class="q-ma-md border-pattern">
      <div class="row">
        <div class="col-1">
          <q-avatar size="32px">
            <q-img
              :src="advisorEdit.assessor.avatar"
              :alt="advisorEdit.assessor.name"
              :title="advisorEdit.assessor.name"
            />
          </q-avatar>
        </div>
        <div class="col-3">
          <span class="text-muted" style="font-size: 12px">ID #{{ advisorEdit.id }}</span>
          <div class="">
            {{ advisorEdit.assessor.name }}
          </div>
        </div>
        <div class="col">
          <q-btn flat round dense color="grey-6" icon="keyboard_arrow_down">
            <q-menu v-model="showOptions" self="top middle" square>
              <q-list style="min-width: 320px; padding-top: 2px">
                <q-item
                  dense
                  v-for="advisor in advisorsSelected"
                  :key="advisor"
                  clickable
                  @click="setAdvisor(advisor.id)"
                  style="border-radius: 6px; margin-inline: 2px"
                >
                  <q-item-section avatar>
                    <q-avatar size="32px">
                      <q-img :src="advisor.avatar" :alt="advisor.name" :title="advisor.name" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section align="left">
                    {{ advisor.name }}
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
      <splent-form-layout />

      <commission-form-layout />
      <div class="text-h7 text-bold q-mt-xl q-mb-md">Clientes</div>
      <customers-form-layout />
    </q-card-section>
  </q-card>
</template>
<script setup>
import { defineComponent, ref, computed } from 'vue'
import { useLayoutStore } from 'src/stores/layout'
import { useAdvisorStore } from 'src/stores/advisor'
import { storeToRefs } from 'pinia'
import TitleCard from 'src/components/Card/TitleCard.vue'
import useAdvisors from 'src/composables/Fakes/useAdvisors'
import SplentFormLayout from './Form/SplentFormLayout.vue'
import CommissionFormLayout from './Form/CommissionFormLayout.vue'
import CustomersFormLayout from './Form/CustomersFormLayout.vue'

const layoutStore = useLayoutStore()
const advisorStore = useAdvisorStore()
const { advisorEdit } = storeToRefs(advisorStore)
const { dialogOpengHeader } = storeToRefs(layoutStore)
const { getAdvisorsIdNameEmail, getAdvisor } = useAdvisors()
const showOptions = ref(false)
const onClose = () => {
  console.log('onClose')
  advisorStore.setAdvisorEdit({})
}
defineComponent({
  name: 'EditAdvisorLayout',
})

const setAdvisor = (advisorId) => {
  advisorStore.setAdvisorEdit(getAdvisor(advisorId))
  showOptions.value = false
}

const advisorsSelected = computed(() => {
  return getAdvisorsIdNameEmail()
})
</script>
