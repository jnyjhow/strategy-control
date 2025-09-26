<template>
  <div class="AddClientCompare">
    <q-avatar size="32px" class="q-mr-sm">
      <img src="https://sources.strategyanalytics.com.br/storage/users/_Avatar_.png" />
    </q-avatar>
    <q-btn
      flat
      dense
      color="grey-6"
      icon-right="keyboard_arrow_down"
      label="Selecionar Cliente"
      no-caps
      @click.prevent.stop="showOptions = !showOptions"
    />
    <q-menu v-model="showOptions" self="top middle" square>
      <q-list style="min-width: 420px; padding-top: 2px">
        <q-item
          dense
          v-for="userClient in optionsAdd"
          :key="userClient"
          clickable
          @click.prevent.stop="selectClientCompare(userClient.id)"
          style="border-radius: 6px; margin-inline: 2px"
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
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { useClientStore } from 'src/stores/client'
import useCliente from 'src/composables/Fakes/useCliente'

export default defineComponent({
  name: 'AddClientCompare',
  setup() {
    const storeClient = useClientStore()
    const { getClient } = useCliente()
    const selectClientCompare = (id) => {
      const selectClient = getClient(id)
      console.log('Selected Client ID:', id)
      storeClient.setCompare([selectClient])
      showOptions.value = false
    }
    const showOptions = ref(false)
    return {
      optionsAdd: storeClient.clientSelected,
      showOptions,
      selectClientCompare,
    }
  },
})
</script>
