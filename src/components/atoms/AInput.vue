<template>
  <q-input
    outlined
    :type="props.type"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: 'text',
  }
})
</script>

<style scoped>

</style>
