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

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 4px;
  margin-bottom: 8px;
  border-bottom: 1px solid #eee;
  button {
    font-size: 10px;
    padding: 4px;
    border-radius: 4px;
    color: #fff;
    line-height: 1;
  }
}
</style>
