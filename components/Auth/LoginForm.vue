<script setup>
const form = ref({
  email: '',
  password: '',
  device: 'fake'
})

const { login, loading, error, errors } = useLogin()

const onSubmit = () => {
  return login(form.value.email, form.value.password, form.value.device)
}

const { getRefreshedErrors } = useErrors()

const onChange = (field) => {
  errors.value = getRefreshedErrors(errors.value, field?.target?.name)
}

const emailField = ref(null)

onMounted(() => {
  if (emailField.value) emailField.value.focus()
})
</script>

<template>
  <Form @submit="onSubmit" class="space-y-6" :disabled="loading">
    <UiAlert v-if="(!loading && error)" :list="errors">{{ error }}</UiAlert>
    <FormField name="email" :label="$t('auth.email')" :errors="errors">
      <template #default="{ description, error }">
        <FormInput ref="emailField" type="email" name="email" autocomplete="on" v-model="form.email"
          :description="description" :error="error" @input="onChange" />
      </template>
    </FormField>
    <FormField name="password" :label="$t('auth.password')" :errors="errors">
      <template #default="{ description, error }">
        <FormInput type="password" name="password" autocomplete="current-password" v-model="form.password"
          :description="description" :error="error" @input="onChange" />
      </template>
      <template #after>
        <UiLink to="/forgot-password" class="mt-2 text-sm text-gray-500">
          {{ $t('auth.forgot-password') }}
        </UiLink>
      </template>
    </FormField>
    <FormSubmitButton class="w-full" :loading="loading">
      {{ $t('auth.login') }}
    </FormSubmitButton>
  </Form>
</template>