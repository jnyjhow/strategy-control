<template>
  <div class="LabelForm" :class="className">
    <span style="font-size: 14px; font-weight: 500">{{ textLabel }}</span>
    <slot></slot>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'LabelForm',
  props: {
    className: {
      type: String,
      default: '',
    },
    textLabel: {
      type: String,
      default: 'Nome Label',
    },
  },
})
</script>
