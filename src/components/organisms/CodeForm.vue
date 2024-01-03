<template>
  <div>
    <img
     src="~/assets/logo.png"
     alt="innuendo logo"
    />
    <h2 class="text-bold q-mb-sm">Code patiente</h2>
    <p class="text-subtitle1 q-mb-xl">Entrez le code d’accès au rapport de votre patiente.</p>
    <div class="row justify-between q-mt-lg">
      <AInput
        class="col-10"
        v-model="codeString"
        placeholder="0000"
        type="number"
        @keydown.enter="handleEnterKey"
      />
      <AButton
        @click="verifyCode"
        :loading="buttonState.loading"
        :disabled="buttonState.disabled"
        arrow
      />
      <AErrorMessage :message="errorMessage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import AInput from '../atoms/AInput.vue';
import AButton from '../atoms/AButton.vue';
import AErrorMessage from '../atoms/AErrorMessage.vue';

import ButtonState from 'src/interfaces/ButtonState';
import API from 'src/api';

const _router = useRouter();

const buttonState: ButtonState = reactive({ loading: false, disabled: true });
const codeString = ref('');
const errorMessage = ref(undefined);

watch(codeString, (newCodeString: string) => {
  if (newCodeString.length != 0) {
    buttonState.disabled = false;
  } else {
    buttonState.disabled = true;
  }
});

function handleEnterKey(event: KeyboardEvent) {
  if (event.keyCode === 13) {
    event.preventDefault();
    verifyCode();
  }
}

async function verifyCode() {
  if (buttonState.disabled) return;
  
  buttonState.loading = true;
  
  try {
    await API.auth.verifyCode(codeString.value);
    
    buttonState.loading = false;
    _router.push({ name: 'home'});
  } catch (error: Error) {
    codeString.value = '';
    errorMessage.value = error.message;
    buttonState.loading = false;
  }
};
</script>

<style scoped>
img {
  width: 70px;
}
</style>