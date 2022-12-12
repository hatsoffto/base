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
  password: '',
  password_confirmation: ''
})

const edited = ref(false)

const { mutate, onDone, loading, error, errors, failed, done } = useResourceMutation({ query: UPDATE_PASSWORD })

const onSubmit = () => {
  edited.value = false

  return mutate({ input: { id: props.user.id, ...form.value } })
}

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
    <template #title>{{ $t('auth.change-password.title') }}</template>
    <template #description>{{ $t('auth.change-password.description') }}</template>
    <FormField name="password" :label="$t('auth.new-password')" :errors="errors">
      <template #default="{ description, error }">
        <FormInput type="password" name="password" autocomplete="current-password" v-model="form.password"
          :description="description" :error="error" @input="onChange" />
      </template>
    </FormField>
    <FormField name="password_confirmation" :label="$t('auth.password_confirmation')" :errors="errors">
      <template #default="{ description, error }">
        <FormInput type="password" name="password_confirmation" v-model="form.password_confirmation"
          :description="description" :error="error" @input="onChange" />
      </template>
    </FormField>
  </AppCardForm>
</template>