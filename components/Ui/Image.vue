<script setup>
const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  modifiers: {
    type: String,
    default: '_'
  },
  srcset: {
    type: Array,
    default: null
  }
})

const { $config } = useNuxtApp()

const imagesUrl = $config.imagesUrl

const getRootUrl = (modifiers) => {
  if (props.src.startsWith('http')) return ''
  return `${imagesUrl}/${modifiers}/`
}

const path = computed(() => {
  return props.src
})

const srcsetUrls = computed(() => {
  if (!props.srcset) return null
  let sets = ``
  for (const key in props.srcset) {
    sets += `${getRootUrl(props.srcset[key].modifiers) + path.value} ${props.srcset[key].size}`
    if (Number(key) !== (props.srcset.length - 1)) {
      sets += ', '
    }
  }
  return sets
})
</script>

<template>
  <img v-if="srcset && !src.startsWith('http')" :src="getRootUrl(modifiers) + path" :alt="alt" :srcset="srcsetUrls" />
  <img v-else :src="getRootUrl(modifiers) + path" :alt="alt" />
</template>