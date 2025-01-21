import type { Component } from 'vue';

export interface Item {
  id: number;
  type: Component;
  content: string;
}
