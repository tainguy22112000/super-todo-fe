<template>
  <header class="sticky top-0 z-10 bg-dark-base mx-auto p-4 h-[80px] w-100 flex justify-between items-center">
    <div class="w-full flex items-center justify-between">
      <div>
        <h1 class="uppercase text-green">Super To Do App</h1>
      </div>
      <p class="uppercase text-white">Nguy Minh Tai</p>
    </div>
  </header>

  <h1 class="my-2 text-center uppercase text-4xl my-10">My Tasks List</h1>

  <div class="bg-light-base w-full flex flex-col gap-4 items-center justify-center p-10 pt-0">
    <div class="flex w-full justify-between items-center">
      <span>Total: {{items.length}}</span>
      <button class="h-[40px] w-[120px] bg-white border text-green hover:bg-green hover:text-white border-green rounded-md font-bold" @click="openTaskCreateModal">Create Task</button>
    </div>
    <div v-if="!items.length" class="flex items-center w-full h-[400px] justify-center p-10 border border-accent-gray">
      <h1>No tasks found</h1>
    </div>
    <AppCordion :items="items" >
      <template v-slot:item="{ item }">
        <TaskDetails
          :item="item"
          @delete="openDeleteTaskModal"
          @edit="onEditTask"
        />
      </template>
    </AppCordion>
  </div>
  <AppModal :title="'Create Task'" ref="createTaskModalEl" @ok="onCreateTask">
    <template v-slot:content>
      <TaskForm @change="onChangeTask" :hiddenFooter="true" />
    </template>
  </AppModal>
  <AppModal :title="'Delete Task'" ref="deleteTaskModalEl" @ok="onDeleteTask">
    <template v-slot:content>
      <h1>Are you sure you want to delete this task?</h1>
    </template>
  </AppModal>
  <AppToast />
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { ITask } from '@/types/task';
import { useGlobalState } from '@/composables/useGlobalState';
import TaskApi from '@/modules/tasks/api/taskApi';
import AppCordion from '@/core/components/cordion/AppCordion.vue';
import AppModal from '@/core/components/AppModal.vue';
import TaskForm from '@/modules/tasks/components/TaskForm.vue';
import TaskDetails from '@/modules/tasks/components/TaskDetails.vue';
import AppToast from '@/core/components/AppToast.vue';
import { useToastStore } from '@/store/useToastStore';

const { userRole } = useGlobalState();
const toastStore = useToastStore();

const items = ref<ITask[]>([]);
const createTaskModalEl = ref<InstanceType<typeof AppModal>>();
const deleteTaskModalEl = ref<InstanceType<typeof AppModal>>();
const createTask = ref<ITask | null>(null);
const selectedTask = ref<ITask | null>(null);

const onCreateTask = async () => {
  try {
    const newTask = await TaskApi.createTask({ userRole: userRole.value, task: createTask.value });
    items.value.push(newTask);
    toastStore.success({ text: 'Task created successfully' });
    createTaskModalEl.value?.closeModal();
  } catch (error) {
    console.error(error);
    toastStore.error({ text: 'Create task failed' });
  }
}

const onDeleteTask = async () => {
  try {
    await TaskApi.deleteTask(selectedTask.value?.id);
    items.value = items.value.filter(item => item.id !== selectedTask.value?.id);
    toastStore.success({ text: 'Task deleted successfully' });
    selectedTask.value = null;
    deleteTaskModalEl.value?.closeModal();
  } catch (error) { 
    console.error(error);
    toastStore.error({ text: 'Delete task failed' });
  }
}

const onEditTask = async (task: ITask) => {
  try {
    const res = await TaskApi.updateTask({ userRole: userRole.value, task: task });
    items.value = items.value.map(item => item.id === task.id ? { ...item, ...res } : item);
    toastStore.success({ text: 'Task updated successfully' });
  } catch (error) {
    console.error(error);
    toastStore.error({ text: 'Task updated failed' });
  }
}

const openTaskCreateModal = async () => {
  createTaskModalEl.value?.openModal();
}

const openDeleteTaskModal = async (task: ITask) => {
  selectedTask.value = task;
  deleteTaskModalEl.value?.openModal();
}

const onChangeTask = async (task: ITask) => {
  createTask.value = task;
}

onBeforeMount(async () => {
  items.value = await TaskApi.getAllTasks({ userRole: userRole.value });
});

</script>