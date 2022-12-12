<script setup>
definePageMeta({
  layout: "account",
  middleware: "auth"
})

const { logout } = useLogout()
</script>

<template>
  <div class="space-y-4 lg:space-y-8">
    <UiH1Header>{{ $t('auth.notification-settings') }}</UiH1Header>
  </div>
</template>