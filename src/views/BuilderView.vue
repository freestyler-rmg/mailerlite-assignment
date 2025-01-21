<script setup lang="ts">
import { ref, markRaw } from 'vue';
import type { Component } from 'vue';
import type { Item } from '@/types/item';
import TextComponent from '@/components/TextComponent.vue';
import ImageComponent from '@/components/ImageComponent.vue';

// TODO: mobile view
// TODO: more flexible dropzone

// CODE BLOCK - init
const components = {
  text: markRaw(TextComponent),
  image: markRaw(ImageComponent),
};

const items = ref<Item[]>([]);

// CODE BLOCK - drag and drop
function startDrag(evt, type: Component) {
  evt.dataTransfer.dropEffect = 'copy';
  evt.dataTransfer.setData('type', type);
  isSidebarShown.value = false;
}

function onDrop(evt, position: 'top' | 'bottom') {
  const itemType = evt.dataTransfer.getData('type');

  if (position === 'top') {
    items.value.unshift({
      id: items.value.length,
      type: components[itemType],
      isEdit: true,
      content: itemType === 'text' ? 'Hello World' : '',
      imageSrc: itemType === 'image' ? '/src/assets/pics/red-panda.jpg' : '',
      imageAlt: itemType === 'image' ? 'Red Panda' : '',
    });
  }

  if (position === 'bottom') {
    items.value.push({
      id: items.value.length,
      type: components[itemType],
      isEdit: true,
      content: itemType === 'text' ? 'Hello World' : undefined,
      imageSrc: itemType === 'image' ? '/src/assets/pics/red-panda.jpg' : undefined,
      imageAlt: itemType === 'image' ? 'Red Panda' : undefined,
    });
  }
}

// CODE BLOCK - duplicate
function duplicateItem(id: number) {
  let itemIndex: number | null = null;
  const item = items.value.find((item, index) => {
    if (item.id === id) {
      itemIndex = index;
      return item;
    }
  });
  if (itemIndex !== null) {
    items.value.splice(itemIndex + 1, 0, { ...item, id: items.value.length, isEdit: false });
  }
}

// CODE BLOCK - delete
function deleteItem(id: number) {
  items.value = items.value.filter((item) => item.id !== id);
}

// CODE BLOCK - move item
function move(id: number, direction: 'up' | 'down') {
  const index = items.value.findIndex((item) => item.id === id);
  const item = items.value[index];
  items.value.splice(index, 1);

  if (direction === 'up' && index > 0) {
    items.value.splice(index - 1, 0, item);
  }

  if (direction === 'down' && index < items.value.length) {
    items.value.splice(index + 1, 0, item);
  }
}

// CODE BLOCK - pick image
function pickThisImage(img: { id: number; imageSrc: string; imageAlt: string }) {
  const index = items.value.findIndex((item) => item.id === img.id);
  items.value[index].imageSrc = img.imageSrc;
  items.value[index].imageAlt = img.imageAlt;
}

// CODE BLOCK - save to json
function saveToJson() {
  const forJson = items.value.map((item) => {
    return {
      id: item.id,
      type: item.type.__name,
      content: item.type.__name === 'TextComponent' ? item.content : undefined,
      imageSrc: item.type.__name === 'ImageComponent' ? item.imageSrc : undefined,
      imageAlt: item.type.__name === 'ImageComponent' ? item.imageAlt : undefined,
    };
  });

  console.log(JSON.stringify(forJson));
}

// CODE BLOCK - toggle sidebar
const isSidebarShown = ref(false);

function toggleSidebar() {
  isSidebarShown.value = !isSidebarShown.value;
}
</script>

<template>
  <div class="builder-view">
    <div :class="['sidebar', { open: isSidebarShown }]">
      <div class="dragable-item" draggable="true" @dragstart="startDrag($event, 'text')">
        <p>Text</p>
      </div>
      <div class="dragable-item" draggable="true" @dragstart="startDrag($event, 'image')">
        <p>Image</p>
      </div>
      <hr />
      <div>
        <button class="small-button w-full bg-[#16a34a]" @click="saveToJson">Save</button>
      </div>

      <div class="toggle-sidebar" @click="toggleSidebar">toggle sidebar</div>
    </div>
    <div class="dropzone-container">
      <div class="dropzone mb-4" @drop="onDrop($event, 'top')" @dragover.prevent @dragenter.prevent>
        dropzone
      </div>
      <div class="content" v-for="item in items" :key="item.id">
        <component
          :is="item.type"
          :id="item.id"
          v-model:content="item.content"
          v-model:isEdit="item.isEdit"
          :image-src="item.imageSrc"
          :image-alt="item.imageAlt"
          class="mb-3"
          @pick-this-image="pickThisImage"
          @duplicateItem="duplicateItem"
          @deleteItem="deleteItem"
          @move="move"
        />
      </div>
      <div
        class="dropzone mt-4"
        @drop="onDrop($event, 'bottom')"
        @dragover.prevent
        @dragenter.prevent
      >
        dropzone
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.builder-view {
  display: flex;
}

.sidebar {
  width: 200px;
  background-color: #f0f0f0;
  padding: 10px;
  border: 1px solid #ccc;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  transform: translateX(-100%);
  transition: transform 0.3s;
  .toggle-sidebar {
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(100%);
    background-color: #333;
    color: #fff;
    z-index: 10;
    font-size: 10px;
    padding: 4px 8px;
    text-transform: uppercase;
    cursor: pointer;
  }
  &.open {
    transform: translateX(0);
  }
  .dragable-item {
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    cursor: pointer;
  }

  @media (screen(md)) {
    position: relative;
    transform: none;
    .toggle-sidebar {
      display: none;
    }
  }
}

.dropzone-container {
  flex: 1;
  padding: 16px;
  padding-top: 32px;
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
