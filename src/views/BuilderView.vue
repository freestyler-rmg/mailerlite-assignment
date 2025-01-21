<script setup lang="ts">
import { ref, markRaw } from 'vue';
import type { Component } from 'vue';
import type { Item } from '@/types/item';
import TextComponent from '@/components/TextComponent.vue';
import ImageComponent from '@/components/ImageComponent.vue';

// CODE BLOCK - init
const components = {
  text: markRaw(TextComponent),
  image: markRaw(ImageComponent),
};

const items = ref<Item[]>([
  {
    id: 0,
    type: markRaw(TextComponent),
    content: 'Hello World',
  },
]);

// CODE BLOCK - drag and drop
function startDrag(evt, type: Component) {
  console.log(evt);
  evt.dataTransfer.dropEffect = 'copy';
  evt.dataTransfer.setData('type', type);
}

function onDrop(evt) {
  const itemType = evt.dataTransfer.getData('type');
  console.log(itemType);
  items.value.push({
    id: items.value.length,
    type: components[itemType],
    content: 'Hello World',
  });
}

// CODE BLOCK - duplicate
function duplicateItem(id: number) {
  const item = items.value.find((item) => item.id === id);
  items.value.push({
    id: items.value.length,
    type: item.type,
    content: item.content,
  });
}

// CODE BLOCK - delete
function deleteItem(id: number) {
  items.value = items.value.filter((item) => item.id !== id);
}

// CODE BLOCK - move item
function move(id: number, direction: 'up' | 'down') {
  const index = items.value.findIndex((item) => item.id === id);
  if (index === 0) return;

  const item = items.value[index];
  items.value.splice(index, 1);

  if (direction === 'up') {
    items.value.splice(index - 1, 0, item);
  } else {
    items.value.splice(index + 1, 0, item);
  }
}
</script>

<template>
  <div class="builder-view">
    <div class="sidebar">
      <div class="dragable-item" draggable="true" @dragstart="startDrag($event, 'text')">
        <p>Text</p>
      </div>
      <div class="dragable-item" draggable="true" @dragstart="startDrag($event, 'image')">
        <p>Image</p>
      </div>
    </div>
    <div class="dropzone-container">
      <div class="content" v-for="item in items" :key="item.id">
        <component
          :is="item.type"
          :id="item.id"
          v-model="item.content"
          class="mb-3"
          @duplicateItem="duplicateItem"
          @deleteItem="deleteItem"
          @move="move"
        />
      </div>
      <div class="dropzone" @drop="onDrop($event)" @dragover.prevent @dragenter.prevent>
        dropzone
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.builder-view {
  display: flex;
  .sidebar {
    width: 200px;
    background-color: #f0f0f0;
    padding: 10px;
  }
}

.sidebar {
  .dragable-item {
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    cursor: pointer;
  }
}

.dropzone-container {
  flex: 1;
  border: 1px solid #ccc;
  padding: 16px;
  min-height: 100vh;
  .dropzone {
    width: 100%;
    border: 1px dashed #ccc;
    padding: 16px;
    font-size: 12px;
    color: #ccc;
    text-align: center;
  }
}
</style>
