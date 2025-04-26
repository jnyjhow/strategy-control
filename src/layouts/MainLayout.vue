<template>
  <q-layout view="lHh Lpr fff" class="bg-white">
    <q-header elevated class="GPL__page-container bg-dark text-white" height-hint="64">
      <q-toolbar class="GPL__toolbar" style="height: 64px">
        <CompletBrand />

        <div
          class="align-center items-center row no-wrap q-ml-sm"
          :class="route.name == 'home' ? 'border-active' : ''"
        >
          <!-- name="fa-solid fa-file-invoice-dollar" -->
          <q-btn flat color="primary" to="/" no-caps unelevated padding="0px" ripple stretch>
            <q-icon
              name="img:icons/transfer.svg"
              size="small"
              color="primary"
              class="col self-ceter"
            />
            <span
              class="text-small q-ml-sm"
              :class="route.name == 'home' ? 'text-primary' : 'text-white'"
            >
              Transações
            </span>
          </q-btn>
        </div>

        <menu-bar
          v-for="(routeLinks, index) in linkesRoutes"
          :key="index"
          class="q-ml-sm"
          :items="routeLinks.items"
          :icon="routeLinks.icon"
          :name="routeLinks.name"
          :color="routeLinks.color"
          :size="routeLinks.size"
          :toPrimary="routeLinks.toPrimary"
        />

        <q-space />
        <q-badge outline color="primary" class="q-pa-sm">
          <q-icon name="img:icons/user.svg" size="0.8rem" class="q-pr-xs" />
          <span class="text-grey">Clientes:</span>
          <span class="text-white text-bold"> 180</span>
        </q-badge>
        <div class="q-gutter-sm row items-center no-wrap">
          <div class="text-small q-px-md">
            <span class="text-grey">Voce está em:</span>
            <span class="text-white text-bold"> Painel de Dados </span>
          </div>
          <q-btn round dense flat color="white" icon="fa-regular fa-bell" class="q-mx-lg">
            <q-badge color="red" text-color="white" floating> 2 </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <q-btn round dense color="white">
            <q-avatar size="2rem" icon="img:icons/user.svg" colo="white" />
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="GPL__page-container">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path"></component>
        </transition>
      </router-view>
    </q-page-container>
    <q-dialog v-model="dialogConfirmAction"> <request-success /> </q-dialog>
  </q-layout>
</template>

<script setup>
import CompletBrand from 'src/components/brand/CompletBrand.vue'
import MenuBar from 'src/components/navbar/menuBar.vue'
import RequestSuccess from 'src/components/Card/RequestSuccess.vue'
import { useRoute } from 'vue-router'
import { defineComponent } from 'vue'
import { useLayoutStore } from 'src/stores/layout'
import { storeToRefs } from 'pinia'
defineComponent({
  name: 'MainLayout',
})
const route = useRoute()
const layoutStore = useLayoutStore()
const { dialogConfirmAction } = storeToRefs(layoutStore)
const linkesRoutes = [
  {
    name: 'Contratos',
    icon: 'fa-solid fa-file-invoice-dollar',
    color: 'primary',
    size: 'small',
    items: [
      { text: 'Contratos', icon: '', to: '/contracts' },
      { text: 'Lógica de Contratos', icon: 'copy', to: '/contracts/logic' },
      { text: 'Lógica de Dividendos', icon: 'paste', to: '/contracts/dividends' },
    ],
  },
  {
    name: 'Gestão de Dados',
    icon: 'img:icons/user-scan.svg',
    color: 'primary',
    size: 'small',
    toPrimary: 'dataManagement',
    items: [
      { text: 'Clientes', icon: '', to: '/dataManagement' },
      { text: 'Assessores', icon: 'copy', to: '/dataManagement/assessores' },
      { text: 'Leads', icon: 'paste', to: '/dataManagement/leads' },
    ],
  },
]
</script>

<style lang="sass">
.fade-enter-active,
.fade-leave-active
  transition: opacity 355ms
.fade-enter,
.fade-leave-to
  opacity: 0
.border-active
  border-left: 2px solid #00a3ff
  border-radius: 2px
  padding: 0.7rem
.text-small
  font-size: 0.7rem
.GPL

  &__toolbar
    height: 64px

  &__toolbar-input
    width: 35%

  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px

    .q-item__section--avatar
      padding-left: 12px
      .q-icon
        color: #5f6368

    .q-item__label:not(.q-item__label--caption)
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem

    &--storage
      border-radius: 0
      margin-right: 0
      padding-top: 24px
      padding-bottom: 24px

  &__side-btn
    &__label
      font-size: 12px
      line-height: 24px
      letter-spacing: .01785714em
      font-weight: 500

  @media (min-width: 1024px)
    &__page-container
      padding-left: 0px
</style>
