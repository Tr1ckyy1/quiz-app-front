<template>
  <Transition
    enter-active-class="duration-300"
    leave-active-class="duration-300"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="toast.isShowing"
      class="flex items-center z-[120] gap-6 w-[340px] fixed top-4 right-1/2 translate-x-1/2 sm:-translate-x-0 sm:right-12 font-raleway py-3 rounded-lg px-8 bg-gradient-to-r to-[#242C32] to-35% overflow-hidden"
      :class="design"
    >
      <div v-if="toast.type === 'success'" class="bg-toast-green/10 p-1 rounded-full">
        <CheckToast />
      </div>
      <div v-else-if="toast.type === 'warning'" class="bg-toast-yellow/10 p-1 rounded-full">
        <WarningToast />
      </div>
      <div v-else class="bg-toast-red/10 p-1 rounded-full">
        <ErrorToast />
      </div>

      <div>
        <h1 class="text-white font-extrabold">{{ toast.text }}</h1>
        <p class="text-[#C8C5C5] text-sm">{{ toast.message }}</p>
      </div>
      <div
        class="before:absolute before:bottom-0 before:right-0 before:h-full before:w-full rounded-b-lg absolute bottom-0 w-full h-1 left-0"
        :class="animate"
      ></div>
    </div>
  </Transition>
</template>

<script>
import CheckToast from '@/icons/CheckToast.vue'
import WarningToast from '@/icons/WarningToast.vue'
import ErrorToast from '@/icons/ErrorToast.vue'
export default {
  components: { CheckToast, WarningToast, ErrorToast },
  props: {
    toast: {
      type: Object,
      required: true
    }
  },

  computed: {
    design() {
      if (this.toast.type === 'success') return 'from-green-900'
      else if (this.toast.type === 'warning') return 'from-yellow-900'
      else return 'from-red-900'
    },
    animate() {
      if (this.toast.type === 'success')
        return `before:animate-[progress_3000ms_linear_forwards] before:bg-toast-green`
      else if (this.toast.type === 'warning')
        return `before:animate-[progress_4000ms_linear_forwards] before:bg-toast-yellow`
      else return `before:animate-[progress_5000ms_linear_forwards] before:bg-toast-red`
    }
  }
}
</script>
