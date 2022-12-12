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
      <UiH1HeaderLg class="text-center">{{ $t('auth.forgot-password') }}</UiH1HeaderLg>
      <p class="mt-4 text-center text-base text-base text-gray-500">
        {{ $t('auth.forgot-password-email') }}
      </p>
    </div>
    <AuthForgotPasswordForm />
  </div>
</template>