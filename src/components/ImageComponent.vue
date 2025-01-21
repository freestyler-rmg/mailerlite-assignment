<script setup lang="ts">
import { ref } from 'vue';

const images = [
  {
    src: '/src/assets/pics/red-panda.jpg',
    alt: 'Red Panda',
  },
  {
    src: '/src/assets/pics/dog.jpg',
    alt: 'Dog',
  },
  {
    src: '/src/assets/pics/river-otter.jpg',
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
const isEdit = ref(true);

function editContent() {
  isEdit.value = true;
}

function pickThisImage(item: { src: string; alt: string }) {
  emit('pickThisImage', { id: props.id, imageSrc: item.src, imageAlt: item.alt });
  isEdit.value = false;
}
</script>

<template>
  <div class="image-component">
    <div class="header">
      <p class="text-xs">Component type: image</p>
      <div>
        <button class="bg-[#052e16]" @click="move('up')">⬆️</button>
        <button class="ml-1 bg-[#052e16]" @click="move('down')">⬇️</button>
        <button class="ml-1 bg-[#3b82f6]" @click="duplicateItem">duplicate</button>
        <button class="ml-1 bg-[#b91c1c]" @click="deleteItem">delete</button>
      </div>
    </div>
    <div>
      <ul v-if="isEdit" class="image-list">
        <li v-for="img in images" :key="img.src" @click="pickThisImage(img)">
          <img :src="img.src" :alt="img.alt" />
        </li>
      </ul>
      <img
        v-else
        class="max-w-md cursor-pointer"
        :src="imageSrc"
        :alt="imageAlt"
        @click="editContent"
      />
    </div>
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
