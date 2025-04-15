<template>
  <div class="TitlePage row">
    <div class="col-12 q-pa-md">
      <div class="text-subtitle2 text-caption text-grey">{{ subtitle }}</div>
      <div class="text-h6">{{ title }}</div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TitlePage',
  props: {
    title: {
      type: String,
      default: 'Title',
    },
    subtitle: {
      type: String,
      default: 'Subtitle',
    },
  },
})
</script>
