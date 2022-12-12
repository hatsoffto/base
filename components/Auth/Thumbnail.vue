<script setup>
import { UserIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
  user: {
    type: Object,
    default: () => {
      return {}
    }
  },
  modifiers: {
    type: String,
    default: '_'
  },
})
</script>

<template>
  <UiImage v-if="(user && user.thumbnail)" :src="user.thumbnail.cdn_path" :modifiers="modifiers"
    class="bg-gray-100 dark:bg-gray-800" />
  <div v-else class="bg-gray-100 dark:bg-gray-800 flex items-center">
    <UserIcon class="w-3/5 h-auto text-gray-400 dark:text-gray-600 mx-auto" />
  </div>
</template>