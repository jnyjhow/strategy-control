<template>
  <q-card class="PreviewLpLayout">
    <div class="row justify-between q-pa-md align-center">
      <title-page title="Pré Visualização" />
      <p class="text-h7 text-muted q-my-md">Expandir preview</p>
      <div ref="container" class="col-12" style="width: 50vw; height: 80vh; overflow: hidden">
        <div :style="scaledStyle">
          <q-resize-observer @resize="onResize"></q-resize-observer>
          <iframe
            src="https://strategyanalytics.com.br/"
            style="width: 100%"
            :width="width"
            frameborder="0"
            height="1000"
          ></iframe>
        </div>
      </div>
    </div>
  </q-card>
</template>
<script setup>
import TitlePage from 'src/components/TitlePage.vue'
import { defineComponent, ref, computed } from 'vue'
defineComponent({
  name: 'PreviewLpLayout',
})

const container = ref(null)
const scale = ref(0.5) // pode calcular dinamicamente depois
const width = ref('100%')
const onResize = () => {
  if (container.value) {
    const width = container.value.offsetWidth
    scale.value = width < 800 ? 0.5 : width < 1200 ? 0.75 : 1
  }
}
const scaledStyle = computed(() => ({
  transform: `scale(${scale.value})`,
  transformOrigin: 'top left',
  width: `${100 / scale.value}%`,
}))
</script>
