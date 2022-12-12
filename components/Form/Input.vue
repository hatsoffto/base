<script setup>
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
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  error: {
    type: String,
    default: ''
  },
  prefix: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
    default: ''
  },
  autocomplete: {
    type: String,
    default: "off",
    validator(value) {
      return ['off', 'on', 'email', "current-password"].includes(value)
    }
  },
  modelValue: [String, Number, Date]
})

const emit = defineEmits(['update:modelValue', 'change'])

const value = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
    emit('change', props.name, value)
  }
})

const fieldRef = ref(null)

const focus = () => {
  fieldRef.value.focus()
}

defineExpose({
  focus
})
</script>

<template>
  <div
    :class="[prefix || suffix ? 'relative rounded-md shadow-sm' : error ? 'border-red-700' : 'border-gray-300 focus:border-indigo-500']">
    <div v-if="prefix" class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <span class="text-gray-500 sm:text-sm">{{ prefix }}</span>
    </div>
    <input ref="fieldRef" :type="type" :id="name" :name="name" v-model="value" :placeholder="placeholder"
      :autocomplete="autocomplete"
      :class="[!prefix && !suffix ? 'shadow-sm' : 'pr-12', prefix ? 'pl-12' : '', 'block w-full py-2.5 px-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-md dark:bg-gray-900 dark:border-gray-700', error ? 'border-red-700' : 'border-gray-300 focus:border-gray-700']"
      :aria-describedby="error ? `${name}-error` : description ? `${name}-description` : null" />
    <div v-if="suffix" class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
      <span class="text-gray-500 sm:text-sm">{{ suffix }}</span>
    </div>
  </div>
</template>