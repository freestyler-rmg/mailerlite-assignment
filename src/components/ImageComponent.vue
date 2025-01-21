<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

import imgRedPanda from '@/assets/pics/red-panda.jpg';
import imgDog from '@/assets/pics/dog.jpg';
import imgRiverOtter from '@/assets/pics/river-otter.jpg';

const images = [
  {
    src: imgRedPanda,
    alt: 'Red Panda',
  },
  {
    src: imgDog,
    alt: 'Dog',
  },
  {
    src: imgRiverOtter,
    alt: 'River Otter',
  },
];

const props = defineProps<{
  id: number;
  imageSrc: string;
  imageAlt: string;
}>();

const emit = defineEmits<{
  duplicateItem: [id: number];
  deleteItem: [id: number];
  move: [id: number, direction: 'up' | 'down'];
  pickThisImage: [{ id: number; imageSrc: string; imageAlt: string }];
}>();

function duplicateItem() {
  emit('duplicateItem', props.id);
}

function deleteItem() {
  emit('deleteItem', props.id);
}

function move(direction: 'up' | 'down') {
  emit('move', props.id, direction);
}

// CODE BLOCK - edit content
const target = ref<HTMLInputElement | null>(null);
const isEdit = defineModel('isEdit', { type: Boolean });

function editContent() {
  isEdit.value = true;
}

function pickThisImage(item: { src: string; alt: string }) {
  emit('pickThisImage', { id: props.id, imageSrc: item.src, imageAlt: item.alt });
  isEdit.value = false;
}

onClickOutside(target, () => (isEdit.value = false));
</script>

<template>
  <div class="image-component">
    <div class="component-header">
      <p class="text-xs">Component type: image</p>
      <div>
        <button class="small-button bg-[#052e16]" @click="move('up')">⬆️</button>
        <button class="small-button ml-1 bg-[#052e16]" @click="move('down')">⬇️</button>
        <button class="small-button ml-1 bg-[#3b82f6]" @click="duplicateItem">duplicate</button>
        <button class="small-button ml-1 bg-[#b91c1c]" @click="deleteItem">delete</button>
      </div>
    </div>
    <div>
      <ul ref="target" v-if="isEdit" class="image-list">
        <li v-for="img in images" :key="img.src" @click="pickThisImage(img)">
          <img :src="img.src" :alt="img.alt" />
        </li>
      </ul>
      <img
        v-else
        class="w-full md:max-w-md cursor-pointer"
        :src="imageSrc"
        :alt="imageAlt"
        @click="editContent"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/component';

.image-list {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    cursor: pointer;
    opacity: 0.8;
    &:hover {
      opacity: 1;
    }
  }
}
</style>
