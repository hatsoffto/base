<script setup>
definePageMeta({
  layout: "clean",
  middleware: "no-auth"
})
</script>

<template>
  <div>
    <div class="mb-8">
      <UiH1HeaderLg class="text-center">{{ $t('auth.register') }}</UiH1HeaderLg>
      <p class="mt-4 text-center text-base text-gray-500">
        {{ $t('auth.register-lead') }}
        {{ ' ' }}
        <UiLink to="/login">{{ $t('auth.login-link') }}
        </UiLink>
      </p>
    </div>
    <AuthRegisterForm />
  </div>
</template>