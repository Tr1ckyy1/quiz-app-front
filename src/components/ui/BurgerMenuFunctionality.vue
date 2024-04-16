<template>
  <Modal @click="closeModal" :modalExists="menuModalOpen" name="menu" />
  <Transition
    enter-active-class="duration-300"
    leave-active-class="duration-300"
    enter-from-class="-translate-x-full"
    leave-to-class="-translate-x-full"
  >
    <div v-if="menuModalOpen" class="fixed z-[120] w-3/4 top-0 left-0 bg-white p-6">
      <div class="flex justify-between items-center border-b pb-4">
        <RouterLink @click="closeModal" to="/">
          <QuizIcon />
        </RouterLink>
        <CancelIcon @click="closeModal" />
      </div>
      <RouterLink @click="closeModal" to="/quizzes" class="py-4 border-b block text-xl font-bold"
        >Quizzes</RouterLink
      >
      <div v-if="!userLoggedIn" class="mt-4 space-y-4">
        <RouterLink
          to="/auth/signup"
          class="block rounded-[4px] py-3 bg-black w-full text-white font-bold text-center"
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
      <div v-else>
        <div class="flex items-center gap-6 border-b py-4">
          <div v-if="userCredentials?.profile_image" class="shrink-0 h-14 w-14">
            <img
              :src="userCredentials?.profile_image"
              class="rounded-full w-full h-full object-cover shrink-0"
            />
          </div>
          <div>
            <h1 class="font-bold">{{ userCredentials?.username }}</h1>
            <p>{{ userCredentials?.email }}</p>
          </div>
        </div>

        <button
          v-if="userLoggedIn"
          @click.stop="logout"
          class="block rounded-[4px] py-3 text-blue-main w-full bg-[#F6F6F7] font-bold text-center mt-4"
        >
          Log out
        </button>
      </div>
    </div>
  </Transition>
</template>

<script>
import Modal from './Modal.vue'
import CancelIcon from '@/icons/CancelIcon.vue'
import QuizIcon from '@/icons/QuizIcon.vue'

export default {
  emits: ['close', 'logUserOut'],
  props: ['menuModalOpen', 'userLoggedIn', 'userCredentials'],
  components: { Modal, CancelIcon, QuizIcon },

  methods: {
    closeModal() {
      this.$emit('close')
    },
    logout() {
      this.$emit('logUserOut')
      this.closeModal()
    }
  }
}
</script>
