<template>
  <div class="InvestmentFormLayout">
    <div class="row justify-around q-gutter-sm">
      <label-form className="col" textLabel="Classificação">
        <q-select
          outlined
          dense
          :options="optionsClassification"
          v-model="clientEdit.investment.register_classification"
          class="q-my-sm"
        ></q-select>
      </label-form>
      <label-form className="col" textLabel="Saldo disponível">
        <q-input
          outlined
          v-model="clientEdit.residential.property"
          dense
          placeholder="value"
          class="q-my-sm"
        ></q-input>
      </label-form>
    </div>
    <div class="row justify-around q-gutter-sm">
      <label-form className="col" textLabel="Assessor Responsável">
        <q-select
          outlined
          dense
          :options="optionsAssessor"
          v-model="clientEdit.investment.assessor"
          class="q-my-sm"
        ></q-select>
      </label-form>
    </div>
    <div class="row justify-around q-gutter-sm">
      <label-form className="col" textLabel="Data de dividendo">
        <q-input
          outlined
          v-model="clientEdit.investment.data_dividendo"
          dense
          class="q-my-sm"
          bg-color="white"
          navigation-min-year-month="1990/07"
          type="date"
        />
      </label-form>
      <label-form className="col" textLabel="Valor do dividendo (R$)">
        <q-input
          outlined
          v-model="clientEdit.residential.dividendo"
          dense
          placeholder="value"
          class="q-my-sm"
        ></q-input>
      </label-form>
    </div>
    <div class="row justify-around q-gutter-sm">
      <label-form textLabel="Senha" className="col">
        <q-input
          outlined
          ref="passwordRef"
          v-model="clientEdit.password"
          dense
          aria-placeholder="Digiter a senha"
          unmasked-value
          class="q-my-sm"
          bg-color="white"
          :type="isPwd ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              color="grey-5"
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </label-form>
    </div>
  </div>
</template>
<script setup>
import LabelForm from 'src/components/Form/LabelForm.vue'
import { defineComponent, ref } from 'vue'
import { useLayoutStore } from 'src/stores/layout'
import { storeToRefs } from 'pinia'
const layoutStore = useLayoutStore()
const { clientEdit } = storeToRefs(layoutStore)
const isPwd = ref(false)
const optionsClassification = [
  { label: 'Ações', value: 'acoes' },
  { label: 'Renda Fixa', value: 'renda_fixa' },
  { label: 'Fundos Imobiliários', value: 'fundos_imobiliarios' },
  { label: 'Criptomoedas', value: 'criptomoedas' },
]
const optionsAssessor = [
  { label: 'John Doe', value: 1 },
  { label: 'John Doe', value: 2 },
  { label: 'John Doe', value: 3 },
  { label: 'John Doe', value: 4 },
]
defineComponent({
  name: 'InvestmentFormLayout',
})
</script>
