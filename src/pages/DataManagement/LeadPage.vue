<template>
  <div class="LeadPage">
    <title-page title="Lead" :breadcrumbs />
  </div>
</template>
<script setup>
import TitlePage from 'src/components/TitlePage.vue'
const breadcrumbs = [
  {
    label: 'Clientes',
  },
  {
    label: 'Lead',
  },
]
</script>
