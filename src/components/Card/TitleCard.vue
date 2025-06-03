<template>
  <q-card-section class="row justify-between">
    <div class="text-h6">{{ title }}</div>
    <q-btn v-close-popup flat icon="close" size="sm" rounded color="grey-6" @click="onClose" />
  </q-card-section>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TitleCard',
  emits: ['onClose'],
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const onClose = () => {
      emit('onClose')
    }

    return {
      onClose,
    }
  },
})
</script>
