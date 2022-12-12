<script setup>
const props = defineProps({
  fluid: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div :class="[fluid ? 'xl:px-8 px-4' : 'mx-auto w-full max-w-7xl px-4']">
    <slot></slot>
  </div>
</template>