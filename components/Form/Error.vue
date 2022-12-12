<script setup>
const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  errors: {
    type: Object,
    default: null
  }
})

const error = computed(() => {
  if (!props.errors) return null
  if (props.errors[`input.${props.name}`]) return props.errors[`input.${props.name}`]
  if (props.errors[props.name]) return props.errors[props.name]
  return null
})

defineExpose({ error })
</script>

<template>
  <p v-if="error" class="mt-2 text-sm text-red-600" :id="`${name}-error`">{{ error }}</p>
</template>