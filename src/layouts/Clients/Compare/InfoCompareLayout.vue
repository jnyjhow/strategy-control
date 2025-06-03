<template>
  <q-form class="InfoCompareLayout">
    <q-input readonly outlined :placeholder="item_one" dense class="q-my-sm"></q-input>

    <q-input readonly outlined :placeholder="item_two" dense class="q-my-sm"></q-input>

    <q-input readonly outlined :placeholder="item_three" dense class="q-my-sm"></q-input>

    <q-input readonly outlined :placeholder="item_four" dense class="q-my-sm"></q-input>

    <q-input readonly outlined :placeholder="item_five" dense class="q-my-sm"></q-input>

    <q-input
      readonly
      outlined
      :placeholder="item_six"
      dense
      class="q-my-sm"
      v-if="item_six"
    ></q-input>

    <q-input
      readonly
      outlined
      :placeholder="item_seven"
      dense
      class="q-my-sm"
      v-if="item_seven"
    ></q-input>

    <q-input
      readonly
      outlined
      :placeholder="item_eight"
      dense
      class="q-my-sm"
      v-if="item_eight"
    ></q-input>
  </q-form>
</template>
<script>
// import labelForm from 'src/components/Form/LabelForm.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InfoCompareLayout',
  props: {
    item_one: {
      type: String,
    },
    item_two: {
      type: String,
    },
    item_three: {
      type: String,
    },
    item_four: {
      type: String,
    },
    item_five: {
      type: String,
    },
    item_six: {
      type: String,
    },
    item_seven: {
      type: String,
    },
    item_eight: {
      type: String,
    },
  },
})
</script>
