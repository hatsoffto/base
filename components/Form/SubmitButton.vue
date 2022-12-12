<script setup>
import { CheckIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';
import { XCircleIcon } from '@heroicons/vue/24/solid';
import Loader from '../Ui/Loader.vue';

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
  variant: {
    type: String,
    default: 'dark'
  },
  isCreateButton: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md'
  }
})

const { t } = useI18n()

const buttonText = computed(() => {
  if (props.done) return props.isCreateButton ? t('common.created') : t('common.saved')
  if (props.failed) return props.isCreateButton ? t('common.failed') : t('common.saving_failed')
  if (props.loading) return props.isCreateButton ? t('common.creating') : t('common.saving')
  return props.isCreateButton ? t('common.create') : t('common.save')
})

const buttonVariant = computed(() => {
  if (props.done) return 'green'
  if (props.failed) return 'red'
  return props.variant
})
</script>

<template>
  <UiButton type="submit" :variant="buttonVariant" :disabled="disabled" :class="[disabled ? 'opacity-50' : '']"
    :size="size">
    <component :is="done ? CheckIcon : failed ? XCircleIcon : loading ? Loader : ChevronRightIcon"
      class="h-4 w-4 mr-1" />
    <slot>{{ buttonText }}</slot>
  </UiButton>
</template>