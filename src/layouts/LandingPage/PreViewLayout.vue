<template>
  <q-card class="PreviewLayout" style="height: 100dvh">
    <q-card-section>
      <div class="text-h6">Pré Visualização</div>
      <div class="text-subtitle2 text-caption text-grey">Expandir preview</div>
    </q-card-section>
    <q-card-section style="height: 100%">
      <iframe
        src="https://strategyanalytics.com.br/"
        width="100%"
        height="100vh"
        frameborder="100"
        style="height: 110%"
      ></iframe>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { defineComponent } from 'vue'

defineComponent({
  name: 'PreviewLayout',
})
</script>
