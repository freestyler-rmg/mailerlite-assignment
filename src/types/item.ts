import type { Component } from 'vue';

export interface Item {
  id: number;
  type: Component;
  isEdit: boolean;
  content?: string;
  imageSrc?: string;
  imageAlt?: string;
}
