<template>
  <q-card class="LogicParametersFilter col-12 q-mx-sm" bordered>
    <!-- <q-card-section class="row justify-between">
      <p class="text-h7">Parâmetros de Lógica</p>
      <q-btn flat size="sm" color="primary" label="Salvar" unelevated icon="checked" />
    </q-card-section> -->
    <q-card-section tag="div" class="row q-gutter-sm">
      <div class="col-12">
        <div class="row justify-between">
          <p class="text-h7">Parâmetros de Lógica</p>
          <q-btn flat size="sm" color="primary" label="Salvar" unelevated icon="checked" />
        </div>
      </div>
      <label-form className="col" textLabel="Fatorial de valorização diária">
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
      <label-form className="col" textLabel="Fatorial de valorização mensal">
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
      <label-form className="col" textLabel="Fatorial de valorização anual">
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
    <q-card-section tag="div" class="row q-gutter-sm">
      <label-form className="col" textLabel="Osciliação de Borda de Superior Máxima">
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
      <label-form className="col" textLabel="Osciliação de Borda de Superior Mínima">
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
      <label-form className="col" textLabel="Osciliação de Borda de Inferior Máxima">
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
      <label-form className="col" textLabel="Osciliação de Borda de Superior Minima">
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
  name: 'LogicParametersFilter',
})
const filter = ref({})
</script>
