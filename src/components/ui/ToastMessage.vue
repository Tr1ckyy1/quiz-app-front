<template>
  <Transition
    enter-active-class="duration-300"
    leave-active-class="duration-300"
    enter-from-class="-translate-y-full"
    leave-to-class="-translate-y-full"
  >
    <div
      v-if="isShowing"
      class="flex items-center gap-6 min-w-[340px] fixed top-4 right-1/2 translate-x-1/2 sm:-translate-x-0 sm:right-12 border-b-[3px] font-raleway py-3 rounded-lg px-8 bg-gradient-to-r to-[#242C32] to-35%"
      :class="design"
    >
      <div v-if="type === 'success'" class="bg-toast-green/10 p-1 rounded-full">
        <CheckToast />
      </div>
      <div v-else-if="type === 'warning'" class="bg-toast-yellow/10 p-1 rounded-full">
        <WarningToast />
      </div>
      <div v-else class="bg-toast-red/10 p-1 rounded-full">
        <ErrorToast />
      </div>

      <div>
        <h1 class="text-white font-extrabold whitespace-nowrap">{{ text }}</h1>
        <p class="text-[#C8C5C5] text-sm">{{ action }}</p>
      </div>
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
    isShowing: {
      type: Boolean,
      required: true,
      default: false
    },
    type: {
      type: String,
      required: true,
      default: 'success'
    },
    action: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  computed: {
    design() {
      if (this.type === 'success') return 'border-b-toast-green from-green-900'
      else if (this.type === 'warning') return 'border-b-toast-yellow from-yellow-900'
      else return 'border-b-toast-red from-red-900'
    }
  }
}
</script>
