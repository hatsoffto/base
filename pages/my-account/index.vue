<script setup>
definePageMeta({
  layout: "account",
  middleware: "auth"
})

const user = useUser()

const onUpdated = (updatedUser) => {
  user.value = updatedUser
}
</script>

<template>
  <div class="space-y-4 lg:space-y-8">
    <UiH1Header>{{ $t('auth.my-account') }}</UiH1Header>
    <AuthProfileForm :user="user" @updated="onUpdated" />
    <AuthPasswordForm :user="user" />
  </div>
</template>