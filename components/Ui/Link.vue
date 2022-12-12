<script setup>
const props = defineProps({
  to: {
    type: [String, Object],
    default: ''
  }
})
</script>

<template>
  <NuxtLink :to="to" class="underline hover:no-underline">
    <slot></slot>
  </NuxtLink>
</template>