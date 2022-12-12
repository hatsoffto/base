<script setup>
const tenant = useTenant()
useTenantHead()

const { t } = useI18n()

const { logout, loading } = useLogout()

const { items } = useAccountMenu()
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
    <AppNavbar fluid />
    <UiContainer class="dark:text-gray-200 pb-16">
      <div class="max-w-screen-lg mx-auto">
        <div class="lg:grid lg:grid-cols-4">
          <aside class="hidden lg:block">
            <nav class="space-y-4 text-base">
              <NuxtLink v-for="(item, index) in items" :key="(item.to ?? item.key)" :to="`${item.to}`"
                :active-class="index ? 'font-bold' : ''" :exact-active-class="index ? '' : 'font-bold'"
                class="flex hover:opacity-75">{{
                    item.text
                }}
              </NuxtLink>
              <button type="button" class="text-red-500 dark:text-red-400 hover:opacity-75 flex items-center"
                @click="logout">
                <UiLoader v-if="loading" class="h-4 w-4 mr-1" />{{ $t('auth.logout') }}
              </button>
            </nav>
          </aside>
          <div class="lg:col-span-3">
            <slot></slot>
          </div>
        </div>
      </div>
    </UiContainer>
    <AppFooter />
  </div>
</template>