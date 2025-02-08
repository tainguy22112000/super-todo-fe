<template>
  <form @submit.prevent>
    <section class=" flex flex-col gap-y-2">
      <div class="flex-1">
        <div class="w-full flex items-center gap-x-2">
          <label class="w-[60px] font-bold" for="title">Title:</label>
          <input class="flex-1 focus:outline-none border-2 border-gray-300 rounded-md p-2" type="text" id="title" v-model="taskForm.title" />
        </div>
        <span class="text-red" v-if="errors.title">{{ errors.title }}</span>
      </div>
      <div class="flex-1">
        <div class="w-full flex items-center gap-x-2">
          <label class="w-[60px] font-bold" for="status">Status:</label>
          <select class="flex-1 focus:outline-none border-2 border-gray-300 rounded-md p-2" id="status" v-model="taskForm.status">
            <option v-for="option in statusOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
          </select>
        </div>
      </div>
      <div class="flex-1" :class="{ 'pointer-events-none': userRole !== 'paid' }">
        <div class="w-full flex items-center gap-x-2" :class="{ 'opacity-50 cursor-not-allowed': userRole !== 'paid' }">
          <label class="w-[60px] font-bold" for="note">Note:</label>
          <textarea class="flex-1 focus:outline-none border-2 border-gray-300 rounded-md p-2" type="text" id="note" v-model="taskForm.note" />
        </div>
        <span class="text-red" v-if="errors.note">{{ errors.note }}</span>
      </div>
    </section>
  </form>
</template>
<script setup lang="ts">
import { reactive, onMounted, defineProps, PropType, watch, computed } from 'vue';
import { ITask, ETaskStatus, ITaskCreate } from '@/types/task';
import { useGlobalState } from '@/composables/useGlobalState';
import { capitalizeWords } from '@/common';

const props = defineProps({
  item: {
    type: Object as PropType<ITask>,
  },
});

const emit = defineEmits(['change']);

const { userRole } = useGlobalState();

const taskForm = reactive<ITaskCreate>({
  title: '',
  status: ETaskStatus.IN_PROGRESS,
  note: '',
});

const errors = reactive({
  title: '',
  note: '',
});

const statusOptions = computed(() => Object.values(ETaskStatus).map(status => ({
  label: capitalizeWords(status),
  value: status,
})));

const validateForm = () => {
  let isValid = true;
  errors.title = '';
  errors.note = '';

  // Title validation: required and minimum length of 3
  if (!taskForm.title) {
    errors.title = 'Title is required.';
    isValid = false;
  } else if (taskForm.title.length < 3) {
    errors.title = 'Title must be at least 3 characters long.';
    isValid = false;
  }

  // note validation: required and minimum length of 10
  if (!taskForm.note) {
    errors.note = userRole.value === 'paid' ? 'Note is required.' : 'Note just can be add/edit in "paid" role.';
    isValid = false;
  } else if (taskForm.note.length < 10) {
    errors.note = userRole.value === 'paid' ? 'Note must be at least 10 characters long.' : 'Note just can be add/edit in "paid" role.';
    isValid = false;
  }
  return isValid;
};

watch(taskForm, () => {
  validateForm()
  emit('change', taskForm);
}, { immediate: true, deep: true })

onMounted(() => {
  if (props.item) {
    taskForm.id = props.item.id;
    taskForm.title = props.item.title;
    taskForm.note = props.item.note;
    taskForm.status = props.item.status;
  }
})

</script>