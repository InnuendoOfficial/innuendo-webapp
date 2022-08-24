<template>
  <div>
    <span class="overline text-bold">{{ props.label }}</span>
    <AInput
      :placeholder="props.placeholder"
      :type="props.type"
      v-model="inputValue"
      dense
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AInput from 'components/atoms/AInput.vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: String,
    default: '',
  }
});
const inputValue = computed({
  
  get(): string {
    return props.modelValue;
  },
  set(value: string) {
    emit('update:modelValue', value);
  }
})
</script>

<style scoped>

</style>