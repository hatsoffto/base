<script setup>
const tenant = useTenant()
useTenantHead()
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
    <AppNavbar fluid />
    <UiContainer class="dark:text-gray-200 pb-8">
      <slot></slot>
    </UiContainer>
    <AppFooter />
  </div>
</template>