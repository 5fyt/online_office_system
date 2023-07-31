<template>
  <svg aria-hidden="true"><use :xlink:href="symbolId" /></svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon' //引用SVG文件的时候省去文件名icon前缀
  },
  name: {
    type: String,
    required: true
  }
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>
