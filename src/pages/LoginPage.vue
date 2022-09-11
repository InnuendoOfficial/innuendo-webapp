<template>
  <q-page>
    <div class="row window-height">
      <div class="col-12 col-sm-6 bg-white row justify-center items-center">
        <LoginForm class="col-5" />
      </div>
      <div class="col-12 col-sm-6 bg-primary row justify-center items-center">
        <div class="col-7 column">
           <h2 class="text-bold q-mb-sm text-white">Innuendo PRO</h2>
            <p class="text-body1 q-mb-xl text-white">
              “ Visualisez et analysez les vraies données de vos patientes.“
            </p>
          <img src="~/assets/login-illustration.png" alt="login illustration">
          <AButton
            class="self-end"
            label="Demander un accès"
            size="lg"
            secondary
            arrow
            dense
            @click="goForm"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import LoginForm from 'src/components/organisms/LoginForm.vue';
import AButton from 'src/components/atoms/AButton.vue';


import { useRouter } from 'vue-router';

const _router = useRouter();

async function goForm(){
    _router.push({name: 'forms'});
}

</script>

<style scoped>
img {
  width: 100%;
}
</style>
