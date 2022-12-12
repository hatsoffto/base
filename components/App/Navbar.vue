<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { BellIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/solid';

const props = defineProps({
  fluid: {
    type: Boolean,
    default: false
  }
})

const user = useUser()

const navigation = computed(() => {
  return [
    {
      text: 'Home',
      to: '/'
    },
    {
      text: 'Artikelen',
      to: '/posts'
    },
    {
      text: 'Podcasts',
      to: '/podcasts'
    }
  ]
})
</script>

<template>
  <Disclosure as="nav" class="border-b mb-4 lg:mb-8 bg-white dark:bg-gray-900 dark:border-gray-800"
    v-slot="{ open, close }">
    <UiContainer :fluid="fluid">
      <div class="flex flex-1  h-16 lg:h-20 items-center justify-center lg:justify-between text-base">
        <slot name="logo">
          <div class="flex items-center py-4 lg:py-5">
            <NuxtLink to="/">
              <AppLogo />
            </NuxtLink>
          </div>
        </slot>
        <slot name="navigation">
          <div class="space-x-8 ml-16 mr-auto text-gray-400 dark:text-gray-400 hidden lg:block font-medium">
            <NuxtLink v-for="item in navigation" :key="item.to" :to="item.to"
              active-class="dark:text-gray-100 text-gray-900" class="py-4 hover:text-gray-900 dark:hover:text-gray-100">
              {{
                  item.text
              }}
            </NuxtLink>
          </div>
        </slot>
        <div class="ml-auto lg:hidden mr-1">
          <DisclosureButton
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex-shrink-0 hidden lg:block">
          <UiButtonLink variant="primary" size="md">
            <ChevronRightIcon class="h-4 w-4 mr-2" />{{ $t('subscribe') }}
          </UiButtonLink>
        </div>
        <div v-if="!user" class="ml-8 flex sm:space-x-4 hidden lg:block">
          <NuxtLink to="/login" class="py-4 hover:text-gray-500 dark:text-white font-medium">{{ $t('auth.login') }}
          </NuxtLink>
        </div>
        <div v-if="user" class="lg:ml-4 flex space-x-2 sm:space-x-4 items-center">
          <NuxtLink to="/notifications"
            class="rounded-full bg-white dark:bg-gray-900 p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-500">
            <span class="sr-only">{{ $t('notifications') }}</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </NuxtLink>
          <AuthAccountDropdown :user="user" />
        </div>
      </div>
    </UiContainer>
    <DisclosurePanel class="lg:hidden">
      <div class="space-y-1 pt-2 pb-3 text-gray-400 dark:text-gray-400 text-base font-medium">
        <NuxtLink v-for="item in navigation" :key="item.to" :to="item.to" @click="close"
          active-class="font-bold dark:text-gray-200 text-gray-900" class="block px-4 py-2">{{ item.text }}
        </NuxtLink>
      </div>
      <div class="mt-2 px-4 pt-6 pb-6 border-t space-y-2">
        <UiButtonLink variant="primary" class="w-full">
          <span class="mx-auto text-base flex items-center">
            <ChevronRightIcon class="h-4 w-4 mr-2" />{{ $t('subscribe') }}
          </span>
        </UiButtonLink>
        <UiButtonLink v-if="!user" to="/login" variant="outline" class="w-full">
          <span class="mx-auto text-base flex items-center">{{ $t('auth.login') }}</span>
        </UiButtonLink>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>