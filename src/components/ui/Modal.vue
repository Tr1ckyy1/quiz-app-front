<template>
  <transition :name="name">
    <div
      v-if="modalExists"
      class="fixed inset-0 bg-black/10 z-[100] backdrop-blur overflow-y-scroll"
      @click.self="$emit('close')"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  emits: ['close'],
  props: ['modalExists', 'name']
}
</script>

<style scoped>
.menu-enter-active {
  transition: opacity 0.3s ease-in;
}

.menu-leave-active {
  transition: opacity 0.3s ease-out;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}
</style>
