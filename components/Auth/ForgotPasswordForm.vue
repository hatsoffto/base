<script setup>
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/solid';

const form = ref({
  email: ''
})

const successMessage = ref(null)
const { t } = useI18n()

const { mutateWithHeaders, onDone, loading, error, errors } = useMutationWithHeaders(FORGOT_PASSWORD)

const onSubmit = () => {
  return mutateWithHeaders({ input: form.value })
}

onDone(() => {
  successMessage.value = t('auth.password-reset-sent')
})

const { getRefreshedErrors } = useErrors()

const onChange = (field) => {
  successMessage.value = null
  errors.value = getRefreshedErrors(errors.value, field?.target?.name)
}
</script>

<template>
  <Form @submit="onSubmit" class="space-y-6" :disabled="loading">
    <UiAlert v-if="((!loading && error) || successMessage)" :list="errors" :type="successMessage ? 'success' : 'error'"
      :icon="successMessage ? CheckCircleIcon : XCircleIcon">{{ error }}{{ successMessage }}
    </UiAlert>
    <FormField name="email" :label="$t('auth.email')" :errors="errors">
      <template #default="{ description, error }">
        <FormInput type="email" name="email" autocomplete="on" v-model="form.email" :description="description"
          :error="error" @input="onChange" />
      </template>
    </FormField>
    <FormSubmitButton class="w-full" :loading="loading">
      {{ $t('auth.send-password') }}
    </FormSubmitButton>
  </Form>
</template>