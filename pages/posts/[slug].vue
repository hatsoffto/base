<script setup>
import { ChevronLeftIcon } from '@heroicons/vue/24/outline';

const route = useRoute()
const { data, pending } = await useFetchQuery(GET_POST_BY_SLUG, { slug: route.params.slug })

if (!data.value.postBySlug) {
  throw createError({ statusCode: 404, statusMessage: 'Post Not Found', fatal: true })
}
</script>

<template>
  <div class="space-y-4">
    <NuxtLink to="/posts" class="flex items-center text-primary-500 space-x-2">
      <ChevronLeftIcon class="h-4 w-4" aria-hidden="true" />{{ $t('posts') }}
    </NuxtLink>
    <UiH1Header>{{ data.postBySlug.title }}</UiH1Header>
  </div>
</template>