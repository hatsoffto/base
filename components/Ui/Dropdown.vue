<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => {
      return []
    }
  },
  buttonClass: {
    type: [String, Array],
    default: "rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-500 focus:ring-primary-500"
  },
  positionClass: {
    type: String,
    default: 'origin-top-right right-0'
  }
})

const emit = defineEmits(['click'])
</script>

<template>
  <Menu as="div" class="relative inline-block text-left my-auto" v-slot="{ close }">
    <div>
      <slot name="button">
        <MenuButton :class="buttonClass">
          <slot name="button-internal">
            <span class="sr-only">Open options</span>
            <UiIconDots class="h-5 w-5" />
          </slot>
        </MenuButton>
      </slot>
    </div>

    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems
        :class="['absolute mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-900 dark:border dark:border-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-20', positionClass]">
        <div class="py-1">
          <MenuItem v-for="item in items" :key="item.to ? item.to : item.key" v-slot="{ active }">
          <NuxtLink v-if="item.to" :to="item.to" :target="item.target ? item.target : ''" @click="close"
            :class="[active ? 'bg-gray-50 dark:bg-gray-800' : '', 'flex w-full text-left px-4 py-2 text-base lg:text-base', item.red ? 'text-red-600' : item.green ? 'text-green-500' : item.yellow ? 'text-yellow-500' : 'dark:text-gray-200']"
            exact-active-class="font-bold">
            <component v-if="item.beforeIcon" :is="item.beforeIcon" class="h-4 w-4 mt-0.5 mr-2 shrink-0" />
            {{ item.text }}
            <component v-if="item.icon" :is="item.icon" class="h-3 w-3 my-auto ml-2 shrink-0" />
          </NuxtLink>
          <div v-else>
            <slot name="item-button" :item="item" :active="active">
              <button type="button" @click="emit('click', item.key, item)"
                :class="[active ? 'bg-gray-50 dark:bg-gray-800' : '', 'w-full text-left px-4 py-2 text-base lg:text-base flex items-center', item.red ? 'text-red-600 dark:text-red-400' : item.green ? 'text-green-500' : item.yellow ? 'text-yellow-500' : '', item.border ? 'border-b' : '']">
                {{
    item.text
                }}
              </button>
            </slot>
          </div>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>