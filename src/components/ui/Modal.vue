<template>
  <transition :name="name">
    <div
      v-if="modalExists"
      class="fixed inset-0 bg-black/10 z-[100] backdrop-blur pt-20 overflow-y-scroll"
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

.auth-enter-active,
.auth-leave-active {
  transition: transform 0.3s ease-in-out;
}
.auth-enter-from,
.auth-leave-to {
  transform: translateY(100%);
}
</style>
