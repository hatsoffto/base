<script setup>
const props = defineProps({
  user: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const form = ref({
  name: props.user?.name,
  email: props.user?.email,
  thumbnail: props.user?.thumbnail ?? null
})

const edited = ref(false)

const { mutate, onDone, loading, error, errors, failed, done } = useResourceMutation({ query: UPDATE_USER, tenantFileRelations: ['thumbnail'] })

const onSubmit = () => {
  edited.value = false

  return mutate({ input: { id: props.user.id, ...form.value } })
}

const emit = defineEmits(['updated'])

onDone((res) => {
  emit('updated', res.data.updateUser)
})

const { getRefreshedErrors } = useErrors()

const onChange = (field) => {
  edited.value = true
  done.value = false
  failed.value = false

  errors.value = getRefreshedErrors(errors.value, field?.target?.name)
}
</script>

<template>
  <AppCardForm @submit="onSubmit" class="space-y-6" :disabled="loading" :error-message="error" :done="done"
    :failed="failed" :edited="edited" :loading="loading">
    <template #title>{{ $t('auth.profile.title') }}</template>
    <template #description>{{ $t('auth.profile.description') }}</template>
    <FormField name="thumbnail" :label="$t('auth.thumbnail')" :errors="errors" sr-only>
      <template #default="{ label, error }">
        <FormImage name="thumbnail" :error="error" :label="label" :erorr="error" size_name="512x512"
          preview-modifier="s_256x256" @change="onChange" v-model="form.thumbnail"
          dropzone-class="rounded-full overflow-hidden bg-gray-50 dark:bg-gray-900" size-class="h-32 w-32" sr-only />
      </template>
    </FormField>
    <FormField name="name" :label="$t('auth.name')" :errors="errors">
      <template #default="{ description, error }">
        <FormInput type="text" name="name" v-model="form.name" :description="description" :error="error"
          @input="onChange" />
      </template>
    </FormField>
    <FormField name="email" :label="$t('auth.email')" :errors="errors">
      <template #default="{ description, error }">
        <FormInput type="email" name="email" autocomplete="on" v-model="form.email" :description="description"
          :error="error" @input="onChange" />
      </template>
    </FormField>
  </AppCardForm>
</template>