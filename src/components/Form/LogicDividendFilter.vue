<template>
  <q-card class="LogicDividendFilter col-12 q-mx-sm" bordered>
    <!-- <q-card-section class="row justify-between">
      <p class="text-h7">Parâmetros de Lógica</p>
      <q-btn flat size="sm" color="primary" label="Salvar" unelevated icon="checked" />
    </q-card-section> -->
    <q-card-section tag="div" class="row q-gutter-sm">
      <div class="col-12">
        <div class="row justify-between">
          <p class="text-h7">Parâmetros de Lógica</p>
          <q-btn no-caps flat size="md" color="primary" label="Editar" unelevated icon="edit" />
        </div>
      </div>
      <label-form className="col" textLabel="Contrato Atrelado">
        <q-input
          outlined
          v-model="filter.fatorialDiaria"
          type="text"
          placeholder="value"
          dense
          reverse-fill-mask
          unmasked-value
        />
      </label-form>
      <label-form className="col" textLabel="Data da Distribuição padrão">
        <q-input
          outlined
          v-model="filter.fatorialMensal"
          type="text"
          placeholder="value"
          dense
          reverse-fill-mask
          unmasked-value
        />
      </label-form>
      <label-form className="col" textLabel="Percentual sobre Valor Base(%)">
        <q-input
          outlined
          v-model="filter.fatorialAnual"
          type="text"
          placeholder="value"
          dense
          reverse-fill-mask
          unmasked-value
        />
      </label-form>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { defineComponent, ref } from 'vue'
import LabelForm from './LabelForm.vue'
defineComponent({
  name: 'LogicDividendFilter',
})
const filter = ref({})
</script>
