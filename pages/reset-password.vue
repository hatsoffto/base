<script setup>
definePageMeta({
  layout: "clean",
  middleware: "no-auth"
})

const tenant = useTenant()
</script>

<template>
  <div>
    <div class="mb-8">
      <UiH1HeaderLg class="text-center">{{ $t('auth.reset-password') }}</UiH1HeaderLg>
      <p class="mt-4 text-center text-base text-gray-500">
        {{ $t('auth.reset-password-description') }}
      </p>
    </div>
    <AuthResetPasswordForm />
  </div>
</template>