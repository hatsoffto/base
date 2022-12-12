<script setup>
const props = defineProps({
  id: {
    type: String,
    default: 'form'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit'])

const submit = () => {
  if (props.disabled) return
  emit('submit')
}
</script>

<template>
  <form :id="id" novalidate @submit.prevent="submit" :class="[disabled ? 'pointer-events-none opacity-75' : '']">
    <slot></slot>
  </form>
</template>