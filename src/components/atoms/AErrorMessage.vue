<template>
  <span
  v-if="props.message"
  class="text-negative text-subtitle1"
>
  {{ props.message}}
</span>
</template>

<script setup lang="ts">
const props = defineProps({
  message: {
    type: String,
    default: undefined,
  }
})
</script>

<style scoped>

</style>