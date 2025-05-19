<template>
  <card-authentication-layout class="AuthPage">
    <sign-in-layout v-if="!passwordReset" />
    <reset-passwor-layout v-else />
    <span class="fixed-bottom-left text-teal-1">v{{ version }}</span>
  </card-authentication-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { storeToRefs } from 'pinia'
import SignInLayout from 'src/layouts/Auth/SignInLayout.vue'
import CardAuthenticationLayout from 'src/layouts/Auth/CardAuthenticationLayout.vue'
import ResetPassworLayout from 'src/layouts/Auth/ResetPassworLayout.vue'
const version = ref(process.env.VERSION_APP)
const storeAuth = useAuthStore()
const { passwordReset } = storeToRefs(storeAuth)

// onMounted(() => {
//   if (route.query.token) {
//     step.value = "resetPassword";
//   }
// });
</script>
<style lang="sass">


.my-input
  padding-left: 12rem
@keyframes autofill
  100%
    background-color: transparent

.q-input,
.q-select
  .q-field__native
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active
      -webkit-background-clip: text
      animation: autofill 0s forwards

  &.q-field--dark .q-field__native
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active
      -webkit-text-fill-color: transparent
</style>
