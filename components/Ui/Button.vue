<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'submit'
  },
  variant: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'md'
  },
  sideButton: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
})

const emit = defineEmits(['click'])

const { baseClass, variantMapping, sizeMapping } = useButton()

const sizeClass = computed(() => {
  return sizeMapping[props.size]
})

const variantClass = computed(() => {
  return variantMapping[props.variant]
})

</script>

<template>
  <button :type="type" :disabled="disabled" @click="emit('click')"
    :class="[baseClass, variantClass, sizeClass, sideButton ? 'rounded-l-md' : 'rounded-md', 'justify-center']">
    <slot></slot>
  </button>
</template>