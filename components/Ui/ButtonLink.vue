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
  to: {
    type: String,
    default: '/'
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
  <NuxtLink :to="to" @click="emit('click')" :class="[baseClass, variantClass, sizeClass, 'flex rounded-md']">
    <slot></slot>
  </NuxtLink>
</template>