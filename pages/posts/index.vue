<script setup>
const { data, pending } = await useFetchQuery(GET_POSTS)
</script>

<template>
  <div class="space-y-4">
    <UiH1Header>{{ $t('posts') }}</UiH1Header>
    <ul v-if="data">
      <li v-for="post in data.posts.data" :key="post.id">
        <UiLink :to="`/posts/${post.slug}`">{{ post.title }}</UiLink>
      </li>
    </ul>
  </div>
</template>