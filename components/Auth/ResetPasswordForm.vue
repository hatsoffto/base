<script setup>
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/solid';

const form = ref({
  password: ''
})

const route = useRoute()
const successMessage = ref(null)

const { t } = useI18n()

const { mutateWithHeaders, onDone, loading, error, errors } = useMutationWithHeaders(RESET_PASSWORD)

const onSubmit = () => {
  return mutateWithHeaders({ input: { password: form.value.password, token: route.query?.token } })
}

onDone(() => {
  successMessage.value = t('auth.password-has-been-reset');
})

const { getRefreshedErrors } = useErrors()

const onChange = (field) => {
  errors.value = getRefreshedErrors(errors.value, field?.target?.name)
}
</script>

<template>
  <Form @submit="onSubmit" class="space-y-6" :disabled="loading">
    <UiAlert v-if="((!loading && error) || successMessage)" :list="errors" :type="successMessage ? 'success' : 'error'"
      :icon="successMessage ? CheckCircleIcon : XCircleIcon">{{ error }}{{ successMessage }}<UiLink
        v-if="successMessage" to="/login" class="ml-1">{{ $t('auth.go-to-login') }}</UiLink>
    </UiAlert>
    <FormField name="password" :label="$t('auth.new-password')" :errors="errors">
      <template #default="{ description, error }">
        <FormInput type="password" name="password" v-model="form.password" :description="description" :error="error"
          @input="onChange" />
      </template>
    </FormField>
    <FormSubmitButton class="w-full" :loading="loading">
      {{ $t('auth.reset-password') }}
    </FormSubmitButton>
  </Form>
</template>