<script setup>
const tenant = useTenant()
</script>

<template>
  <div class="border-t bg-white dark:bg-gray-900 py-5 mt-auto dark:border-gray-800">
    <UiContainer class="text-base text-gray-400 dark:text-gray-600">
      <div class="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center">
        <nav class="order-1 lg:order-2 flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-4">
          <NuxtLink to="/terms" class="underline hover:no-underline text-gray-400 dark:text-gray-300">{{
              $t('terms-and-conditions')
          }}</NuxtLink>
          <NuxtLink to="/privacy-policy" class="underline hover:no-underline text-gray-400 dark:text-gray-300">{{
              $t('privacy-policy')
          }}</NuxtLink>
        </nav>
        <div class="order-2 lg:order-1">© {{ new Date().getFullYear() }} {{ tenant.name }}</div>
      </div>
    </UiContainer>
  </div>
</template>