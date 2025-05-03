<template>
  <q-page class="TransctionPage">
    <title-page title="Transação" subtitle="Transações" />
    <div class="q-pt-md q-pl-md row">
      <div class="col-12">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey col-12"
          active-color="primary"
          indicator-color="primary"
          inline-label
          align="left"
        >
          <q-tab
            no-caps
            name="carteiras"
            label="Todas a Carteiras"
            icon="img:icons/layout-grid.svg"
          />
          <q-tab
            no-caps
            name="disponivel"
            label="Disponível para Movimentar"
            icon="img:icons/wallet.svg"
          />
          <q-tab
            no-caps
            name="contratos"
            label="Contratos/Investimentos"
            icon="img:icons/file-dollar-current.svg"
          />
          <q-tab
            no-caps
            name="strategy"
            label="Strategy Banking(em breve)"
            icon="img:icons/building-bank.svg"
            disable
          />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="carteiras">
            <wallet-layout />
          </q-tab-panel>

          <q-tab-panel name="disponivel">
            <available-for-movement-layout />
          </q-tab-panel>

          <q-tab-panel name="contratos">
            <contratcts-invesments-layout />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import TitlePage from 'src/components/TitlePage.vue'
import WalletLayout from 'src/layouts/Transaction/WalletLayout.vue'
import AvailableForMovementLayout from 'src/layouts/Transaction/AvailableForMovementLayout.vue'
import ContratctsInvesmentsLayout from 'src/layouts/Transaction/ContractsInvesmentsLayout.vue'
import { ref } from 'vue'

const tab = ref('carteiras')
</script>
