<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { onClickOutside } from '@vueuse/core';

const content = defineModel({ type: String });

const props = defineProps<{
  id: number;
}>();

const emit = defineEmits<{
  duplicateItem: [id: number];
  deleteItem: [id: number];
  moveUp: [id: number];
  moveDown: [id: number];
  updateContent: [{ id: number; content: string }];
}>();

function duplicateItem() {
  emit('duplicateItem', props.id);
}

function deleteItem() {
  emit('deleteItem', props.id);
}

function moveUp() {
  emit('moveUp', props.id);
}

function moveDown() {
  emit('moveDown', props.id);
}

// CODE BLOCK - edit content
const isEdit = ref(false);
const target = ref<HTMLInputElement | null>(null);

async function editContent() {
  isEdit.value = true;
  await nextTick();
  target.value?.focus();
}

onClickOutside(target, () => (isEdit.value = false));
</script>

<template>
  <div class="text-component">
    <div class="header">
      <p class="text-xs">Component type: text</p>
      <div>
        <button class="bg-[#052e16]" @click="moveUp">⬆️</button>
        <button class="ml-1 bg-[#052e16]" @click="moveDown">⬇️</button>
        <button class="ml-1 bg-[#3b82f6]" @click="duplicateItem">duplicate</button>
        <button class="ml-1 bg-[#b91c1c]" @click="deleteItem">delete</button>
      </div>
    </div>
    <div>
      <textarea ref="target" v-if="isEdit" v-model="content" class="w-full" />
      <p v-else @click="editContent" class="whitespace-pre">{{ content }}</p>
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
</style>
