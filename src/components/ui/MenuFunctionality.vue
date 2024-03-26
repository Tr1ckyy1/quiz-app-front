<template>
  <Modal @click="closeModal" :modalExists="menuModalOpen" name="menu" />
  <Transition
    enter-active-class="duration-300"
    leave-active-class="duration-300"
    enter-from-class="-translate-x-full"
    leave-to-class="-translate-x-full"
  >
    <div v-if="menuModalOpen" class="fixed z-[120] w-3/4 top-0 left-0 bg-white p-6">
      <div class="flex justify-between items-center">
        <QuizIcon />
        <CancelIcon @click="closeModal" />
      </div>
      <h1 class="py-5 border-y text-xl font-bold my-8">Quizzes</h1>
      <RouterLink
        to="/auth/signup"
        class="block rounded-[4px] py-3 bg-black w-full text-white font-bold mb-6 text-center"
      >
        Sign up
      </RouterLink>
      <RouterLink
        to="/auth/login"
        class="block rounded-[4px] py-3 text-blue-main w-full bg-[#F6F6F7] font-bold text-center"
      >
        Log in
      </RouterLink>
    </div>
  </Transition>
</template>

<script>
import Modal from './Modal.vue'
import CancelIcon from '@/icons/CancelIcon.vue'
import QuizIcon from '@/icons/QuizIcon.vue'

export default {
  emits: ['close'],
  props: ['menuModalOpen'],
  components: { Modal, CancelIcon, QuizIcon },

  methods: {
    closeModal() {
      this.$emit('close')
    }
  }
}
</script>
