<template>
  <span
    role="img"
    :aria-label="ariaLabel"
    :class="spanClass"
    v-bind="{...$attrs}"
  >
    <component
      v-if="svgComponent"
      :is="svgComponent"
      aria-hidden="true"
      focusable="false"
      :class="{ 'svg': color || 'currentColor' }"
      :style="svgStyles"
    >
    </component>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import svg from '@/core/components/icons/svg';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  width: {
    type: [Number, String],
    default: 24,
  },
  height: {
    type: [Number, String],
    default: 24,
  },
  ariaLabel: {
    type: String,
    default: '',
  },
  size: {
    type: [Number, String],
    default: 24,
  },
  color: {
    type: String,
    default: 'currentColor',
  },
  disable: {
    type: Boolean,
    default: false,
  },
});

const w = computed(() => `${props.width || props.size || 24}px`);
const h = computed(() => `${props.height || props.size || 24}px`);

const svgComponent = computed(() => {
  const icon = svg[props.name];
  if (!icon) {
    return undefined;
  }
  return icon;
});

const svgStyles = computed(() => {
  return ({
    width: `${props.width || props.size || 24}px`,
    height: `${props.height || props.size || 24}px`,
  });
});

const spanClass = computed(() => {
  const classIcon = [];
  if (props.disable) {
    classIcon.push('disable');
  }

  if (svgComponent.value) {
    classIcon.push('app-icon');
    return classIcon;
  }
  return classIcon;
});
</script>
<style lang="scss" scoped>
.app-icon {
  display: inline-flex;
  vertical-align: middle;
  cursor: pointer;
  > svg {
    width: v-bind(w);
    height: v-bind(h);
  }
}
.disable {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
