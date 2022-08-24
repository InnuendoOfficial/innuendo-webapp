<template>
  <q-input
    outlined
    :type="props.type"
    v-model="inputValue"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: String,
    default: '',
  }
})
const inputValue = computed({
  
  get(): string {
    return props.modelValue;
  },
  set(value: string) {
    emit('update:modelValue', value);
  }
})
</script>
