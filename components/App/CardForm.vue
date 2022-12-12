<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  done: {
    type: Boolean,
    default: false
  },
  failed: {
    type: Boolean,
    default: false
  },
  edited: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  errors: {
    type: Object,
    default: () => {
      return {}
    }
  },
  errorMessage: {
    type: String,
    default: ''
  },
  hideHeader: {
    type: Boolean,
    default: false
  },
  fetching: {
    type: Boolean,
    default: false
  },
})

const emit = defineEmits(['submit', 'delete'])

const onSubmit = () => {
  if (props.loading) return

  emit('submit')
}
</script>

<template>
  <Form @submit="onSubmit">
    <div
      class="border-t border-b sm:border-l sm:border-r dark:border-gray-800 sm:overflow-hidden sm:rounded-md -mx-4 sm:mx-0">
      <div class="space-y-8 bg-white dark:bg-gray-900 py-6 px-4 sm:p-6">
        <UiAlert v-if="!loading && errorMessage" :list="errors">{{ errorMessage }}</UiAlert>
        <div v-if="!hideHeader">
          <h3 class="text-lg font-semibold leading-6">
            <slot name="title"></slot>
          </h3>
          <p class="mt-1 text-base text-gray-600 dark:text-gray-400">
            <slot name="description"></slot>
          </p>
        </div>
        <div :class="['max-w-screen-sm pb-4 space-y-8', hideHeader ? 'mt-2' : '']">
          <div v-if="fetching" class="space-y-8">
            <slot name="loading"></slot>
          </div>
          <slot></slot>
        </div>
      </div>
      <div class="bg-gray-50 dark:bg-gray-900 dark:border-gray-800 border-t px-4 py-4 text-right sm:px-6">
        <slot name="button" :loading="loading" :done="done" :failed="failed" :edited="edited" :disabled="disabled">
          <FormSubmitButton :loading="loading" :done="done" :failed="failed" :edited="edited" :disabled="disabled">
          </FormSubmitButton>
        </slot>
      </div>
    </div>
  </Form>
</template>