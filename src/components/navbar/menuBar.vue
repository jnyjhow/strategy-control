<template>
  <div class="q-ml-md cursor-pointer non-selectable menuBar">
    <div class="align-center items-center row no-wrap" :class="includesTo() ? 'border-active' : ''">
      <q-icon
        name="fa-solid fa-file-invoice-dollar"
        size="small"
        color="primary"
        class="col self-ceter"
      />
      <span class="text-small q-ml-sm" :class="includesTo() ? 'text-primary' : ''">
        {{ name }}
      </span>
    </div>
    <q-menu
      auto-close
      class="q-mt-lg"
      transition-show="jump-down"
      transition-hide="jump-up"
      :offset="[0, 25]"
      dark
    >
      <q-list dense style="min-width: 100px; min-width: 12rem" class="q-my-xs">
        <q-item v-for="(item, index) in items" :key="index" dense class="row">
          <q-btn
            :to="item.to"
            exact
            dense
            class="col-12"
            :color="isActive(item.to) ? 'primary' : ''"
            align="left"
            no-caps
          >
            <span class="text-weight-light q-pa-xs q-pr-md">{{ item.text }}</span>
          </q-btn>
        </q-item>
      </q-list>
    </q-menu>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'CompletBrand',
  props: {
    name: { String },
    icon: { String },
    color: { String, default: 'primary' },
    size: { String, default: 'small' },
    toPrimary: { String, default: 'contracts' },
    items: {
      type: Array,
      default: () => [
        { text: 'Cut', icon: 'cut', to: '/' },
        { text: 'Copy', icon: 'copy', to: '/' },
        { text: 'Paste', icon: 'paste', to: '/' },
        { text: 'Select All', icon: 'select_all', to: '/' },
      ],
    },
  },
  setup(props) {
    const route = useRoute()
    const isActive = (item) => {
      return route.path === item
    }
    const includesTo = () => {
      return route.path.includes(props.toPrimary)
    }
    return {
      isActive,
      includesTo,
    }
  },
})
</script>
<style scoped>
.q-list--dense > .q-item,
.q-item--dense {
  padding: 1.8px 5px !important;
}
.border-active {
  border-left: 2px solid #00a3ff;
  border-radius: 2px;
  padding: 0.7rem;
}
</style>
