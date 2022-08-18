<template>
  <div>
    <img src="~/assets/logo.png" alt="innuendo logo">
    <h2 class="text-bold">Connexion</h2>
    <p>Connectez vous avec vos accès professionnels.</p>
    <InputControl
      label="Email"
      placeholder="email@innuendo-pro.com"
    />
    <InputControl
      label="Mot de passe"
      placeholder="motdepasse"
      type="password"
    />
  </div>
</template>

<script setup lang="ts">
import InputControl from '../molecules/InputControl.vue';
</script>

<style scoped>

</style>