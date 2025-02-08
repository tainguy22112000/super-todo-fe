<template>
  <div class="bg-green rounded-md w-full flex items-center justify-between" @click="toggle()">
    <button
      class="w-full text-left p-4 focus:outline-none"
      :class="{ 'text-blue-500': open }"
    >
      {{ item?.title }}
    </button>
    <slot name="icon" :item="item">
      <div class="p-4">
        <AppIcon name="arrow" size="10" class="arrow-icon" :class="{ 'rotate': open }" />
      </div>
    </slot>
  </div>
  <Transition 
    name="accordion"
    @before-enter="leave"
    @enter="enter"
    @before-leave="enter"
    @leave="leave"
    :duration="100"
  >
  <div v-show="open" class="p-4" ref="contentRef">
    <div ref="taskDetailsRef">
      <slot name="content" :item="item" />
    </div>
  </div>
</Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, PropType, nextTick } from 'vue';
import { ITask } from '@/types/task';
import AppIcon from '@/core/components/AppIcon.vue';
import TaskDetails from '@/modules/tasks/components/TaskDetails.vue';

defineProps({
  item: {
    type: Object as PropType<ITask>,
    required: true, 
  },
  index: {
    type: Number,
    required: true,
  },
});
const open = ref<boolean>(false);
const contentRef = ref<HTMLElement>();
const taskDetailsRef = ref<HTMLElement>();

let resizeObserver: ResizeObserver;

const toggle = () => {
  open.value = !open.value;
}

const enter = (el: HTMLElement) => {
  contentRef.value.style.height = el.scrollHeight + 'px';
}

const leave = (el: HTMLElement) => {
  contentRef.value.style.height = '0';
}

onMounted(() => {
  if (taskDetailsRef.value) {
    resizeObserver = new ResizeObserver(async () => {
      await nextTick();
      if (open.value && contentRef.value) {
        contentRef.value.style.height = contentRef.value.scrollHeight + 'px';
      }
    });
    resizeObserver.observe(taskDetailsRef.value);
  }
});

onBeforeUnmount(() => {
  if (resizeObserver && taskDetailsRef.value) {
    resizeObserver.unobserve(taskDetailsRef.value);
  }
});

</script>

<style scoped>
.accordion-enter-active, .accordion-leave-active {
  will-change: height, opacity;
  transition: height 0.5s ease, opacity 0.5s ease;
  overflow: hidden;
}
.accordion-enter, .accordion-leave-to {
  height: 0 !important;
  opacity: 0;
}

.arrow-icon {
  display: inline-block;
  transition: transform 0.3s ease;
}

.arrow-icon.rotate {
  transform: rotate(90deg);
}
</style>