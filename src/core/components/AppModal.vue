<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content flex flex-col">
      <div class="header w-full p-2" v-if="!hiddenHeader">
        <slot name="header">
          <div class="flex items-center justify-between">
            <h3 v-if="title" class="text-2xl font-bold">{{ title }}</h3>
          </div>
        </slot>
      </div>
      <div class="content w-full p-2 mt-4">
        <slot name="content" />
      </div>
      <div class="footer w-full p-2" v-if="!hiddenFooter">
        <slot name="footer">
          <div class="modal-footer h-[40px] flex item-center justify-end gap-x-2">
            <button class="w-[80px] h-[40px] p-2 bg-white border border-green text-green rounded-md font-bold" @click="closeModal">Close</button>
            <button class="w-[80px] h-[40px] p-2 bg-green text-white rounded-md font-bold" @click="$emit('ok')">Ok</button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps({
  title: {
    type: String,
    default: '',
  },
  hiddenFooter: {
    type: Boolean,
    default: false,
  },
  hiddenHeader: {
    type: Boolean,
    default: false,
  },
});

const isVisible = ref<boolean>(false);

const emit = defineEmits(['ok']);

const openModal = () => {
  isVisible.value = true;
};

const closeModal = () => {
  isVisible.value = false;
};

defineExpose({
  openModal,
  closeModal,
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  padding: 8px;
  background: white;
  border-radius: 8px;
  position: relative;
  width: 80%;
  max-width: 1000px;
}
</style>