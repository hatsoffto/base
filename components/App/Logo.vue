<script setup>
const tenant = useTenant()
</script>
<template>
  <div class="flex items-center">
    <UiImage v-if="(tenant.logo || tenant.thumbnail)" :alt="tenant.name"
      :src="tenant.logo ? tenant.logo.cdn_path : tenant.thumbnail.cdn_path"
      :class="['h-8 lg:h-9 w-auto', tenant.logo && !tenant.logoDarkMode ? '' : 'block dark:hidden']" />
    <span v-if="!tenant.logo" :class="['text-lg font-bold block dark:hidden', tenant.thumbnail ? 'ml-2' : '']">{{
        tenant.name
    }}</span>
    <UiImage v-if="(tenant.logoDarkMode || tenant.thumbnail)" :alt="tenant.name"
      :src="tenant.logoDarkMode ? tenant.logoDarkMode.cdn_path : tenant.thumbnail.cdn_path"
      class="h-8 lg:h-9 w-auto hidden dark:block" />
    <span v-if="!tenant.logoDarkMode && !tenant.logo"
      :class="['text-lg text-white font-bold hidden dark:block', tenant.thumbnail ? 'ml-2' : '']">{{
    tenant.name
      }}</span>
  </div>
</template>