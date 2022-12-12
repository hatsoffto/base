<script setup>
import { ChevronRightIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
  error: Object
})
const handleError = () => clearError({ redirect: '/' })

useTenantHead()
</script>

<template>
  <div class="min-h-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
    <div class="mx-auto sm:max-w-max">
      <main class="text-center space-y-8">
        <p class="font-bold tracking-tight text-8xl">{{ error.statusCode }}</p>
        <div>
          <h1 class="text-xl font-bold tracking-tight text-gray-400 dark:text-gray-300 sm:text-3xl">{{
              error.statusMessage
          }}</h1>
        </div>
        <UiButton @click="handleError" size="lg">{{ $t('back-home') }}
          <ChevronRightIcon class="h-4 w-4 ml-2" />
        </UiButton>
      </main>
    </div>
  </div>
</template>