<template>
  <div
    class="AuthPage row text-white items-center justify-center align-center bg-transparent card-authentication"
  >
    <q-card class="col-sm-8 col-5 col-md-5 card-auth">
      <div class="row">
        <q-btn
          padding="none"
          flat
          icon="keyboard_backspace"
          label="Voltar"
          size="sm"
          no-caps
          @click="selectedInitial = false"
        ></q-btn>
        <div class="col-12 q-mt-md text-h6 text-bold">Acesse sua conta</div>
      </div>
      <q-form class="q-gutter-sm row q-mt-md" @submit.prevent.stop="onSubmit">
        <label-form className="col-12" textLabel="E-mail ou CPF">
          <q-input
            outlined
            v-model="auth.email"
            type="text"
            dense
            reverse-fill-mask
            unmasked-value
            class="q-my-sm"
            bg-color="white"
          />
        </label-form>
        <label-form className="col-12" textLabel="Senha">
          <q-input
            outlined
            v-model="auth.email"
            type="text"
            dense
            reverse-fill-mask
            unmasked-value
            class="q-my-sm"
            bg-color="white"
          />
        </label-form>

        <div class="col-12" style="text-align-last: end">
          <q-btn
            padding="none"
            flat
            label="Esquece minha senha"
            size="12px"
            class="text-grey-5"
            no-caps
            @click="selectedInitial = false"
          />
        </div>
        <q-checkbox
          size="xs"
          v-model="auth.conectetion"
          label="Manter conectado"
          keep-color
          color="white"
        />
        <div class="col-12 q-mt-md">
          <q-btn
            color="primary"
            label="Acessar Conta"
            type="submit"
            padding="md lg"
            size="lg"
            class="text-h7"
            no-caps
            style="width: 100%; border-radius: 8px"
          />
          <q-btn
            color="primary"
            flat
            label="Ainda não tem uma conta? Cadastre aqui"
            padding="md lg"
            size="lg"
            class="text-h7"
            no-caps
            style="width: 100%; border-radius: 8px"
          />
        </div>
      </q-form>
      <span class="fixed-bottom-left text-teal-1">v{{ version }}</span>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { storeToRefs } from 'pinia'
import LabelForm from 'src/components/Form/LabelForm.vue'
import useNotification from 'src/composables/global/useNotification'
const storeAuth = useAuthStore()
const { selectedInitial, auth } = storeToRefs(storeAuth)
// const route = useRoute();
const version = ref(process.env.VERSION_APP)
const { successNotify } = useNotification()
const onSubmit = async () => {
  successNotify('Acesso validado com sucesso! Voce será redirecionado...', 30000)
  // emailRef.value.validate();
  // passwordRef.value.validate();
  // if (!emailRef.value.hasError || !passwordRef.value.hasError) {
  //   await authAction();
  // }
}
// onMounted(() => {
//   if (route.query.token) {
//     step.value = "resetPassword";
//   }
// });
</script>
<!-- <style lang="sass">
// .authPage
//   height: 100dvh
//   display: grid
//   justify-items: center

</style> -->
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
