<script setup lang="ts">
import { ref } from 'vue';
import TextComponent from '@/components/TextComponent.vue';
import ImageComponent from '@/components/ImageComponent.vue';

function startDrag(evt) {
  console.log(evt);
  evt.dataTransfer.dropEffect = 'copy';
  evt.dataTransfer.effectAllowed = 'move';
}

function onDrop(evt) {
  console.log(evt, 'onDrop');
}

const items = ref([
  {
    id: 0,
    type: TextComponent,
    content: 'Hello World',
  },
]);
</script>

<template>
  <div class="builder-view">
    <div class="sidebar">
      <div class="dragable-item" draggable="true" @dragstart="startDrag($event)">
        <p>Text</p>
      </div>
      <div class="dragable-item" draggable="true" @dragstart="startDrag($event)">
        <p>Image</p>
      </div>
    </div>
    <div class="dropzone-container">
      <div class="content" v-for="item in items" :key="item.id">
        <component :is="item.type" :content="item.content" />
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
