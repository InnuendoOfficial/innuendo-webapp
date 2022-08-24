<template>
  <q-btn
    :label="props.label"
    :color="colors.background"
    :text-color="colors.text"
    :icon-right="arrow"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  secondary: {
    type: Boolean,
    default: false,
  },
  arrow: {
    type: Boolean,
    default: false,
  },
});

const colors = computed(() => {
  if (props.secondary) return { background: 'white', text: 'dark' };
  return { background: 'primary', text: 'white' };
});
const arrow = computed(() => {
  if (props.arrow) return 'arrow_right';
  return null;
});
</script>

<style scoped>

</style>
