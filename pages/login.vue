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
      <UiH1HeaderLg class="text-center">{{ $t('auth.login') }}</UiH1HeaderLg>
      <p class="mt-4 text-center text-base text-base text-gray-500">
        {{ $t('auth.login-lead') }}
        {{ ' ' }}
        <UiLink to="/register">{{
            $t('auth.register-link')
        }}</UiLink>
      </p>
    </div>
    <AuthLoginForm />
  </div>
</template>