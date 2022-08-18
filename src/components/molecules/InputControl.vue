<template>
  <div>
    <span>{{ props.label }}</span>
    <AInput
      :placeholder="props.placeholder"
      :type="props.type"
    />
  </div>
</template>

<script setup lang="ts">
import AInput from 'components/atoms/AInput.vue';

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
  }
});
</script>

<style scoped>

</style>