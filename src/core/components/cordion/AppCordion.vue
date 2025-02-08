<template>
  <div class="accordion w-full">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="border-b border-gray-200"
    >
      <AppCordionItem  :item="item" :index="index">
        <template v-slot:content="{ item }">
          <slot name="item" :item="item" />
        </template>
      </AppCordionItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ITask } from '@/types/task';
import { PropType } from 'vue';
import AppCordionItem from '@/core/components/cordion/AppCordionItem.vue';

const emit = defineEmits(['delete', 'edit']);
defineProps({
  items: {
    type: Array as PropType<ITask[]>,
    default: () => ([])
  }
})
</script>