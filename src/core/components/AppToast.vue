<template>
  <Teleport to="body">
    <Transition name="toast">
      <div v-if="toasts.length" class="fixed bottom-3 right-5 z-100 flex flex-col gap-4">
        <TransitionGroup name="toast" tag="ul">
          <li
            v-for="toast in toasts"
            :class="['flex items-center gap-4 rounded border p-2 px-4 m-1 w-fit', toastClassMap[toast.status]]"
            :key="toast.text"
          >
            <span class="text-lg font-semibold">
              {{ toast.text }}
            </span>
          </li>
        </TransitionGroup>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { TToastStatus, useToastStore } from '@/store/useToastStore';
import { storeToRefs } from 'pinia';

const toastClassMap: Record<TToastStatus, string> = {
  warning: "bg-[#fff] border-orange text-orange",
  error: "bg-[#fff] border-red text-red-500",
  success: "bg-[#fff] border-green text-green",
};

// const toastIconMap: Record<TToastStatus, string> = {
//   error: "toast-error",
//   warning: "toast-warning",
//   success: "toast-success",
// };

const toastStore = useToastStore();
const { toasts } = storeToRefs(toastStore);
</script>
<style scoped lang="scss">
.toast-enter-from,
.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.toast-enter-active,
.toast-leave-active {
  transition: 0.25s ease all;
}
</style>