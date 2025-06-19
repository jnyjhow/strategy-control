<template>
  <div class="section-editor q-mb-md">
    <q-item v-ripple>
      <q-item-section side>
        <q-chip>
          <q-avatar color="red" text-color="white">50</q-avatar>
          Emails
        </q-chip>
      </q-item-section>
      <q-item-section>
        <q-item-label>Mary</q-item-label>
        <q-item-label caption>2 new messages</q-item-label>
      </q-item-section>
      <q-item-section side> 3 min ago </q-item-section>
    </q-item>
  </div>
</template>

<script setup>
import { defineProps, defineComponent } from 'vue'

defineComponent({
  name: 'SectionEditor',
})

defineProps({
  description: String,
  avatar: { type: String, default: '' },
  icon: { type: String, default: '' },
  date: { type: String, default: '' },
  name: { type: String, default: '' },
})
</script>

<style scoped>
.section-editor {
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s;
  cursor: url('/icons/cursor.png'), pointer;
}
.section-editor.active-section > .section-content {
  border-color: var(--q-primary); /* usa a variável $primary do Quasar */
  background-color: #dcdcdc;
  border-top: 1px solid #656565;
}
.section-editor:hover {
  border-color: var(--q-primary);
}
</style>
