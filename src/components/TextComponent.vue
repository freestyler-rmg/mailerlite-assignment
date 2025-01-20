<script setup lang="ts">
const props = defineProps<{
  content: string;
}>();
</script>

<template>
  <div class="text-component">
    <p>text</p>
    <p>{{ props.content }}</p>
  </div>
</template>
