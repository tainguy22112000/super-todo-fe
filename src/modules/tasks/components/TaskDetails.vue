<template>
  <div class="w-full relative hover:cursor-pointer flex flex-row items-center justify-between">
    <section class="w-[calc(100%-30px)]" v-if="!isEditing">
      <h1><strong>Title:</strong> {{ item.title }}</h1>
      <p><strong>Status:</strong> <span class="uppercase">{{ item.status }}</span></p>
      <p><strong>Created At:</strong> {{ formatDateToDDMMYYY(item.createdAt) }}</p>
      <p><strong>Note:</strong> {{ item.note || 'No note' }}</p>
    </section>
    <section class="w-[calc(100%-30px)]" v-else>
      <TaskForm :item="item" @change="handleChange" />
    </section>
    <div class="absolute top-0 right-0 flex flex-col gap-y-2">
      <AppIcon @click="editTask" name="edit" size="10" />
      <AppIcon @click="deleteTask" name="trash" size="10" />
      <AppIcon @click="confirmEditTask" name="done" size="10" :disable="!isChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, defineProps, computed, watch, defineEmits, onMounted } from 'vue';
import { ITask } from '@/types/task';
import { isEqual } from '@/common';
import AppIcon from '@/core/components/AppIcon.vue';
import TaskForm from '@/modules/tasks/components/TaskForm.vue';
import { formatDateToDDMMYYY } from '@/common/date';

const props = defineProps({
  item: {
    type: Object as PropType<ITask>,
    required: true,
  },
});

const emit = defineEmits(['delete', 'edit', 'change']);

const isEditing = ref<boolean>(false);

const taskDetails = ref<ITask>(props.item);

const isChange = computed(() => !isEqual(taskDetails.value, props.item));

const handleChange = (data: ITask) => {
  taskDetails.value = data;
  emit('change', data);
}

const editTask = () => {
  isEditing.value = !isEditing.value;
}

const deleteTask = async () => {
  emit('delete', taskDetails.value);
}

const confirmEditTask = async () => {
  emit('edit', taskDetails.value);
  isEditing.value = false;
}

watch(() => props.item, (newVal) => {
  taskDetails.value = newVal;
}, { deep: true, immediate: true });

</script>