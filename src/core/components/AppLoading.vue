<template>
  <div class="loading-container">
    <AppIcon name="loading" class="loading-icon" />
    <!-- <v-icon class="loading-icon" icon="custom:loading" color="#42B883" /> -->
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
@keyframes animation {
  0% {
   transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.loading-container {
  background-color: rgba(255, 255, 255, 0.2);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 199;
  .loading-icon {
    z-index: 200;
    animation: animation 1s infinite linear;
  }
}
</style>