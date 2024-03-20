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

      <div class="flex items-center gap-2 w-1/3">
        <!-- <div class="relative flex right-0">
          <input
            type="text"
            id="search"
            placeholder="Search"
            class="border outline-none bg-transparent"
          />
          <label class="absolute top-1/2 -translate-y-1/2 left-0" for="search">
            <SearchIcon />
          </label>
        </div> -->
        <div>
          <BurgerMenuIcon class="sm:hidden" />
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import QuizIcon from '@/icons/QuizIcon.vue'
import BurgerMenuIcon from '@/icons/BurgerMenuIcon.vue'
import SearchIcon from '@/icons/SearchIcon.vue'

export default {
  components: { QuizIcon, BurgerMenuIcon, SearchIcon },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>
