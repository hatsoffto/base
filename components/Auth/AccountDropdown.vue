<script setup>
const props = defineProps({
  user: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const { items } = useAccountMenu()
const { logout } = useLogout()

const onClickDropdown = (key) => {
  if (key === 'logout') {
    return logout()
  }
}

const { t } = useI18n()

const dropdownItems = computed(() => {
  items.value.push({
    text: t('auth.logout'),
    key: 'logout',
    red: true
  })

  return items.value
})
</script>

<template>
  <UiDropdown :items="dropdownItems" @click="onClickDropdown">
    <template #button-internal>
      <AuthThumbnail :user="user" modifiers="s_64x64"
        class="w-8 h-8 rounded-full overflow-hidden shrink-0 group-hover:opacity-75" />
      <div class="sr-only">{{ user.name }}</div>
    </template>
  </UiDropdown>
</template>