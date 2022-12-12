<script setup>
import { PlusIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
  id: {
    type: String,
    id: 'id'
  },
  size_name: {
    type: String,
    default: '300 x 300'
  },
  url: {
    type: String,
    default: null
  },
  dropzoneClass: {
    type: [String, Array],
    default: ''
  },
  srOnly: {
    type: Boolean,
    default: false
  }
})

const accept = computed(() => {
  return "image/gif,image/jpeg,image/png,image/jpg";
})

const fileInput = ref(null)

const { uploading, progress, error, errors, key, downloadUrl, upload } = useUploadFile()

const emit = defineEmits(['uploaded', 'reset'])

const onPickFile = () => {
  fileInput.value.click()
}

const onFileChange = (files) => {
  console.log(files)
  if (files.length) {
    emit('reset')
  }

  error.value = null
  errors.value = null
  const file = files[0]

  return upload(file)
    .then(res => {
      emit('uploaded', { ...res })
    })
}

const onDrop = (e) => {
  const acceptArray = accept.value.split(",")

  if (
    e.dataTransfer.files.length &&
    acceptArray.includes(e.dataTransfer.files[0].type)
  ) {
    return onFileChange(e.dataTransfer.files)
  }
}

const endUploading = () => {
  uploading.value = false
}

defineExpose({
  endUploading,
  onPickFile
})

</script>

<template>
  <div v-if="!url">
    <UiAlert v-if="error" class="mb-4">{{ error }}</UiAlert>
    <button :class="[
      'flex justify-center border-2 border-dashed border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:hover:border-gray-700 dark:hover:bg-gray-800 px-6 pt-5 pb-6 w-full items-center group',
      dropzoneClass
    ]" type="button" @click="onPickFile" @drop.prevent="onDrop" @dragover.prevent>
      <div v-if="!uploading" class="space-y-1 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-300 dark:text-gray-800 dark:group-hover:text-gray-700"
          stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

        <div :class="['flex text-sm text-gray-400', srOnly ? 'sr-only' : '']">
          <label :for="id + '-upload'"
            :class="['relative cursor-pointer rounded-md font-medium text-brand-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-brand-500 focus-within:ring-offset-2 hover:text-brand-500', srOnly ? 'sr-only' : '']">
            <span>{{ $t('file-upload.link') }}</span>
          </label>
          <p :class="['pl-1', srOnly ? 'sr-only' : '']">{{ $t('file-upload.label') }}</p>
        </div>
        <p :class="['text-xs text-gray-400', srOnly ? 'sr-only' : '']">{{ $t(`file-upload.description`, {
            size:
              size_name
          })
        }}</p>
      </div>
      <div v-else class="text-center">
        <UiLoader class="h-8 w-8" />
      </div>
    </button>
  </div>
  <div v-else>
    <slot :url="url"></slot>
  </div>
  <input :id="id + '-upload'" ref="fileInput" :accept="accept" :name="id + 'File'" type="file" class="sr-only"
    @change="onFileChange($event.target.files)" />
</template>