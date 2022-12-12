<script setup>
import { XCircleIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  icon: {
    type: Object,
    default: XCircleIcon
  },
  list: {
    type: Object,
    default: null
  },
  type: {
    type: String,
    defualt: 'error'
  },
})

const bgClass = computed(() => {
  if (props.type === 'success') return 'bg-green-50'
  return 'bg-red-50'
})

const iconClass = computed(() => {
  if (props.type === 'success') return 'text-green-700'
  return 'text-red-400'
})

const textClass = computed(() => {
  if (props.type === 'success') return 'text-green-700'
  return 'text-red-700'
})
</script>

<template>
  <div :class="['rounded-md p-4', bgClass]">
    <div class="flex">
      <div class="flex-shrink-0">
        <component :is="icon" :class="['h-5 w-5', iconClass]" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <h3 :class="['text-sm font-medium', textClass]">
          <slot></slot>
        </h3>
        <div v-if="list && Object.keys(list).length !== 0" :class="['mt-2 text-sm', textClass]">
          <ul role="list" class="list-disc space-y-1 pl-5">
            <li v-for="(item, index) in list" :key="index">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>