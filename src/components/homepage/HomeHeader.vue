<template>
  <header class="p-4 border-b sticky top-0 w-full bg-white z-50 sm:px-24 sm:py-6">
    <nav class="flex justify-between items-center">
      <div class="flex items-center gap-20">
        <RouterLink to="/" @click="scrollToTop">
          <QuizIcon />
        </RouterLink>
        <RouterLink class="hidden sm:block" to="/quizzes">
          <h1>Quizzes</h1>
        </RouterLink>
      </div>
      <div class="hidden sm:flex items-center gap-10">
        <BaseButton link to="/signup" mode="signup">Sign up</BaseButton>
        <BaseButton link to="/login" mode="login">Log in</BaseButton>
      </div>
      <BurgerMenuIcon class="sm:hidden" />
    </nav>
  </header>
</template>

<script>
import QuizIcon from '@/icons/QuizIcon.vue'
import BurgerMenuIcon from '@/icons/BurgerMenuIcon.vue'

export default {
  components: { QuizIcon, BurgerMenuIcon },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>
