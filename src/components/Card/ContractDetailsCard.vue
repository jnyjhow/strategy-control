<template>
  <q-card class="ContractDetailsCard q-pa-sm q-pb-md row q-gutter-sm" bordered flat>
    <q-item
      v-for="(item, index) in item"
      :key="index"
      clickable
      v-ripple
      class="rounded-borders col-3"
      :class="$q.dark.isActive ? 'bg-white text-white bordered-grey' : 'bg-white bordered-grey'"
      :to="item.linkTo ?? item.linkTo"
    >
      <q-item-section avatar>
        <q-btn
          round
          text-color="dark"
          color="grey-3"
          unelevated
          :icon="item.icon"
          :style="item.icon === 'fa-solid fa-sliders' ? 'transform: rotate(90deg);' : ''"
        />
        <!-- <q-avatar rounded>fa-solid fa-sliders
          <q-icon name="description" />
        </q-avatar> -->
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-muted text-grey-9 text-h7">{{ item.title }} </q-item-label>
      </q-item-section>
      <q-item-section side class="q-pa-none">
        <q-item-label class="text-info text-weight-bold">
          <q-toggle v-model="paramentros" v-if="item.selectd" />
          {{ item.linkText }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>
<script>
import { defineComponent } from 'vue'
import { useLayoutStore } from 'src/stores/layout'
import { storeToRefs } from 'pinia'
export default defineComponent({
  name: 'ContractDetailsCard',
  props: {
    item: {
      type: Array,
      default: () => [
        {
          title: 'Detalhes do Contrato',
          icon: 'description',
          linkTo: '/contracts/logic',
          linkText: 'Ver Contrato',
          selectd: false,
        },
      ],
    },
  },
  setup() {
    const storeLayout = useLayoutStore()
    const { paramentros } = storeToRefs(storeLayout)
    return {
      paramentros,
    }
  },
})
</script>
<style scoped lang="sass">
.bordered-grey
  border: 1px solid #ececec !important
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2)
</style>
