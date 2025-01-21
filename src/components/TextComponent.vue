<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue';
import { onClickOutside } from '@vueuse/core';

const content = defineModel('content', { type: String });
const isEdit = defineModel('isEdit', { type: Boolean });

const props = defineProps<{
  id: number;
}>();

const emit = defineEmits<{
  duplicateItem: [id: number];
  deleteItem: [id: number];
  move: [id: number, direction: 'up' | 'down'];
  updateContent: [{ id: number; content: string }];
  testing: [id: number];
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

async function editContent() {
  isEdit.value = true;
  await nextTick();
  target.value?.focus();
}

onClickOutside(target, () => (isEdit.value = false));

onMounted(() => {
  target.value?.focus();
});
</script>

<template>
  <div class="text-component">
    <div class="component-header">
      <p class="text-xs">Component type: text</p>
      <div>
        <button class="small-button bg-[#052e16]" @click="move('up')">⬆️</button>
        <button class="small-button ml-1 bg-[#052e16]" @click="move('down')">⬇️</button>
        <button class="small-button ml-1 bg-[#3b82f6]" @click="duplicateItem">duplicate</button>
        <button class="small-button ml-1 bg-[#b91c1c]" @click="deleteItem">delete</button>
      </div>
    </div>
    <div>
      <!-- TODO: change this into contenteditable -->
      <textarea ref="target" v-if="isEdit" v-model="content" class="w-full" />
      <p v-else @click="editContent" class="whitespace-pre">{{ content }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/component';
</style>
