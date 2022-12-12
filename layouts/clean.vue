<script setup>
useTenantHead()
</script>

<template>
  <div class="min-h-screen dark:bg-gray-900">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm py-12 px-4 dark:text-gray-200">
      <slot></slot>
    </div>
  </div>
</template>