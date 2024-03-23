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
      <button
        @click="openSignupModal"
        class="rounded-[4px] py-3 bg-black w-full text-white font-bold mb-6"
      >
        Sign up
      </button>
      <button
        @click="openLoginModal"
        class="rounded-[4px] py-3 text-blue-main w-full bg-[#F6F6F7] font-bold"
      >
        Log in
      </button>
    </div>
  </Transition>
  <Modal @close="closeSignupModal" :modalExists="signupModalShowing" name="auth">
    <SignupForm />
  </Modal>
  <Modal @close="closeLoginModal" :modalExists="loginModalShowing" name="auth">
    <LoginForm />
  </Modal>
</template>

<script>
import Modal from './Modal.vue'
import CancelIcon from '@/icons/CancelIcon.vue'
import QuizIcon from '@/icons/QuizIcon.vue'
import SignupForm from '@/components/ui/auth/SignupForm.vue'
import LoginForm from '@/components/ui/auth/LoginForm.vue'

export default {
  emits: ['close', 'open'],
  props: ['menuModalOpen'],
  components: { Modal, CancelIcon, QuizIcon, SignupForm, LoginForm },
  data() {
    return {
      signupModalShowing: false,
      loginModalShowing: false
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    openSignupModal() {
      this.closeModal()
      this.signupModalShowing = true
    },
    openLoginModal() {
      this.closeModal()
      this.loginModalShowing = true
    },
    closeSignupModal() {
      this.signupModalShowing = false
      this.$emit('open')
    },
    closeLoginModal() {
      this.loginModalShowing = false
      this.$emit('open')
    },

    swap() {
      if (this.loginModalShowing) {
        this.signupModalShowing = true
        this.loginModalShowing = false
      } else if (this.signupModalShowing) {
        this.signupModalShowing = false
        this.loginModalShowing = true
      }
    }
  },
  provide() {
    return { swap: this.swap }
  }
}
</script>
