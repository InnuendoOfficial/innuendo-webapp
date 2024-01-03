<template>
  <div>
    <img
     src="~/assets/logo.png"
     alt="innuendo logo"
    />
    <h2 class="text-bold q-mb-sm">Connexion</h2>
    <p class="text-subtitle1 q-mb-xl">Connectez vous avec vos accès professionnels.</p>
    <form @submit.prevent="login" @keydown.enter="handleEnterKey">
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
  </form>
    <AErrorMessage :message="errorMessage" />
    <q-btn label="Mot de passe oublié ?" type="submit" @click="retrievePwd" text-color="black"/>
    <q-dialog v-model="errorDialog">
      <q-card class='text-center' style="width: 300px; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);">
        <q-card-section>
          <p class="errorText">Votre abonnement n'est pas ou plus valide. Veuillez faire une demande d'abonnement.</p>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn label="OK" color="primary" @click="errorDialog = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
import axios from 'axios';

const _router = useRouter();
const _userStore = useUserStore();
const credentials: Credentials = reactive({ login: '', password: '' });
const buttonState: ButtonState = reactive({ loading: false, disabled: true });
let errorMessage = ref(undefined);
let errorDialog = ref(false)

watch(credentials, (newCredentials: Credentials) => {
  if (newCredentials.login.length > 0 && newCredentials.password.length > 0) {
    buttonState.disabled = false;
  } else {
    buttonState.disabled = true;
  }
});

function handleEnterKey(event: KeyboardEvent) {
  if (event.keyCode === 13) {
    event.preventDefault();
    login();
  }
}

async function retrievePwd(){
    _router.push({name: 'forgot_pwd'});
}


async function login(){
  if (buttonState.disabled) return;

  buttonState.loading = true;
  try {
    const _res = await API.auth.login(credentials.login, credentials.password);

    buttonState.loading = false;
   // _userStore.setUser(_res.user);
    if (_res == 0) {
      _router.push({name: 'code'});
    }
    else 
      errorDialog.value = true
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