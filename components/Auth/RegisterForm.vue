<script setup>
const form = ref({
  name: '',
  email: '',
  password: '',
  device: 'fake'
})

const { register, loading, error, errors } = useRegister()

const onSubmit = () => {
  return register(form.value.name, form.value.email, form.value.password, form.value.device)
}

const { getRefreshedErrors } = useErrors()

const onChange = (field) => {
  errors.value = getRefreshedErrors(errors.value, field?.target?.name)
}

const nameField = ref(null)

onMounted(() => {
  if (nameField.value) nameField.value.focus()
})
</script>

<template>
  <Form @submit="onSubmit" class="space-y-6" :disabled="loading">
    <UiAlert v-if="(!loading && error)" :list="errors">{{ error }}</UiAlert>
    <FormField name="name" :label="$t('auth.name')" :errors="errors">
      <template #default="{ description, error }">
        <FormInput ref="nameField" type="text" name="name" v-model="form.name" :description="description" :error="error"
          @input="onChange" />
      </template>
    </FormField>
    <FormField name="email" :label="$t('auth.email')" :errors="errors">
      <template #default="{ description, error }">
        <FormInput type="email" name="email" autocomplete="on" v-model="form.email" :description="description"
          :error="error" @input="onChange" />
      </template>
    </FormField>
    <FormField name="password" :label="$t('auth.password')" :errors="errors">
      <template #default="{ description, error }">
        <FormInput type="password" name="password" autocomplete="current-password" v-model="form.password"
          :description="description" :error="error" @input="onChange" />
      </template>
    </FormField>
    <FormSubmitButton class="w-full" variant="primary" :loading="loading">
      {{ $t('auth.register') }}
    </FormSubmitButton>
  </Form>
</template>