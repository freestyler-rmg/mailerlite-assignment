<script setup lang="ts">
const props = defineProps<{
  content: string;
}>();
</script>

<template>
  <div class="image-component">
    <p>image</p>
    <p>{{ props.content }}</p>
  </div>
</template>
