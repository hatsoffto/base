<script setup>
import { PencilIcon, XMarkIcon } from '@heroicons/vue/24/outline';

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
  size_name: {
    type: String,
    default: '300x300'
  },
  previewModifier: {
    type: String,
    default: 's_512x512'
  },
  error: {
    type: String,
    default: ''
  },
  dropzoneClass: {
    type: String,
    default: ''
  },
  sizeClass: {
    type: String,
    default: ''
  },
  srOnly: {
    type: Boolean,
    default: false
  },
  modelValue: Object
})

const emit = defineEmits(['update:modelValue', 'change'])

const file = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('change', props.name, value)
    emit('update:modelValue', value)
  }
})

const { tenantFile, createTenantFile } = useCreateTenantFile()

const uploadField = ref(null)

const onUploaded = (f) => {
  return createTenantFile({
    name: f.name,
    filetype: f.filetype,
    key: f.key
  })
    .then(() => {
      uploadField.value.endUploading()
      emit('change', props.name, tenantFile.value)
      emit('update:modelValue', tenantFile.value)
    })
}

const onPickFile = () => {
  if (uploadField.value) return uploadField.value.onPickFile()
}

const resetFile = () => {
  emit('change', props.name, null)
  emit('update:modelValue', null)
}
</script>

<template>
  <div>
    <UiUpload ref="uploadField" type="image" :url="file?.url ?? null" :size_name="size_name" @uploaded="onUploaded"
      :dropzone-class="[dropzoneClass, sizeClass]" :sr-only="srOnly" @reset="resetFile()">
      <div :class="['relative', sizeClass]">
        <div class="absolute right-2 top-2 flex space-x-2 z-10">
          <UiButton type="button" variant="auto" size="sm" @click="onPickFile()">
            <span class="sr-only">{{ $t('common.edit') }}</span>
            <PencilIcon class="h-4 w-4" />
          </UiButton>
        </div>
        <button type="button" @click="onPickFile()"
          :class="['relative overflow-hidden border border-dashed border-transparent hover:border-gray-300 group', dropzoneClass, sizeClass]">
          <UiImage :src="file?.cdn_path ?? ''" :modifiers="previewModifier" :class="'w-full h-auto'"
            crossorigin="anonymous" />
        </button>
      </div>
    </UiUpload>
  </div>
</template>