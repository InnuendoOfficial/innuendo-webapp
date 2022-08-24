<template>
  <q-page>
    <div class="row window-height">
      <div class="col-12 col-sm-6 bg-primary row justify-center items-center">
        <div class="col-7 column">
           <h2 class="text-bold q-mb-sm text-white">Bienvenue {{ fullname }}</h2>
          <img src="~/assets/code-illustration.png" alt="code illustration">
        </div>
      </div>
      <div class="col-12 col-sm-6 bg-white row justify-center items-center">
        <CodeForm class="col-6" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CodeForm from 'src/components/organisms/CodeForm.vue';
import { useUserStore } from 'src/stores/user';

const _userStore = useUserStore();

const fullname = computed(() => {
  return `${_userStore.user.firstName} ${_userStore.user.lastName}`;
})
</script>

<style scoped>

</style>