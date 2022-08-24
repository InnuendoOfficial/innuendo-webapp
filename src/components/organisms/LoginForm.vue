<template>
  <div>
    <img
     src="~/assets/logo.png"
     alt="innuendo logo"
    />
    <h2 class="text-bold q-mb-sm">Connexion</h2>
    <p class="text-subtitle1 q-mb-xl">Connectez vous avec vos accès professionnels.</p>
    <InputControl
      class="q-my-lg"
      label="Email"
      placeholder="email@innuendo-pro.com"
      v-model="credentials.login"
    />
    <InputControl
      class="q-my-lg"
      label="Mot de passe"
      placeholder="motdepasse"
      type="password"
      v-model="credentials.password"
    />
    <AButton
      @click="login"
      :loading="buttonState.loading"
      :disabled="buttonState.disabled"
      label="Connexion"
      size="lg"
      dense
    />
    <AErrorMessage :message="errorMessage" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'src/stores/user';

import InputControl from '../molecules/InputControl.vue';
import AButton from '../atoms/AButton.vue';
import AErrorMessage from '../atoms/AErrorMessage.vue';

import Credentials from 'src/interfaces/Credentials';
import ButtonState from 'src/interfaces/ButtonState';
import API from 'src/api';

const _router = useRouter();
const _userStore = useUserStore();
const credentials: Credentials = reactive({ login: '', password: '' });
const buttonState: ButtonState = reactive({ loading: false, disabled: true });
let errorMessage = ref(undefined);

watch(credentials, (newCredentials: Credentials) => {
  if (newCredentials.login.length > 0 && newCredentials.password.length > 0) {
    buttonState.disabled = false;
  } else {
    buttonState.disabled = true;
  }
});

async function login(){
  if (buttonState.disabled) return;

  buttonState.loading = true;
  try {
    const _res = await API.auth.login();
    

    buttonState.loading = false;
    _userStore.setUser(_res.user);
    _router.push({name: 'code'});
  } catch (error: Error) {
    credentials.login = '';
    credentials.password = '';
    errorMessage.value = error.message;
    buttonState.loading = false;
  }
}
</script>

<style scoped>
img {
  width: 70px;
}
button {
  width: 100%;
}
</style>