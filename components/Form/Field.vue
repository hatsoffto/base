<script setup>
const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  errors: {
    type: Object,
    default: () => {
      return {}
    }
  },
  srOnly: {
    type: Boolean,
    default: false
  },
  descriptionBelowField: {
    type: Boolean,
    default: false
  }
})

const errorField = ref(null)
</script>

<template>
  <div class="flex flex-col">
    <label :for="name"
      :class="['block text-base font-bold', errorField?.error ? 'text-red-800' : 'text-gray-700 dark:text-gray-200', srOnly ? 'sr-only' : '']">{{
          label
      }}</label>

    <p v-if="description"
      :class="['mt-1 text-sm text-gray-500 dark:text-gray-200', descriptionBelowField ? 'order-2' : '']"
      :id="`${name}-description`">
      <slot name="description" :description="description">{{ description }}</slot>
    </p>
    <div :class="[srOnly ? '' : 'mt-2', descriptionBelowField ? 'order-1' : '']">
      <slot :error="errorField?.error" :label="label" :description="description"></slot>
    </div>
    <slot name="after"></slot>
    <FormError ref="errorField" :errors="errors" :name="name" />
  </div>
</template>