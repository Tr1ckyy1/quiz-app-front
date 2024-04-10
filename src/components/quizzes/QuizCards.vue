<template>
  <div v-if="isLoading" class="flex justify-center items-center mt-6">
    <LoadingSpinner />
  </div>

  <section v-else>
    <ul
      v-if="quizzes.length > 0"
      class="my-10 px-4 sm:px-24 space-y-6 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6"
    >
      <QuizCardItem
        v-for="quiz in quizzes"
        :key="quiz.id"
        :title="quiz.title"
        :categories="quiz.categories"
        :difficultyLevel="quiz.difficulty_level"
        :duration="quiz.duration"
      />
    </ul>
    <button
      v-if="quizzes.length > 0"
      class="flex items-center rounded-lg py-3 px-5 bg-[#1018280D] hover:brightness-90 gap-3 mx-auto mb-14"
    >
      <LoadMoreIcon />
      <span class="text-blue-main font-semibold">Load more</span>
    </button>
    <p class="px-4 sm:px-24 mb-20 font-bold text-2xl" v-else>
      No available quizzes for this category
    </p>
  </section>
</template>

<script>
import QuizCardItem from './QuizCardItem.vue'
import LoadMoreIcon from '@/icons/LoadMoreIcon.vue'
import { getQuizzes } from '@/services/api/quiz'

export default {
  components: { QuizCardItem, LoadMoreIcon },
  data() {
    return {
      quizzes: [],
      isLoading: false
    }
  },
  watch: {
    '$route.query': {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.fetchQuizzes(newValue)
        }
      }
    }
  },
  methods: {
    async fetchQuizzes(query) {
      try {
        this.isLoading = true

        const {
          data: { data: quizzes }
        } = await getQuizzes(query)

        this.quizzes = quizzes
      } catch (err) {
        this.$store.dispatch('toast/setToast', {
          type: 'error',
          text: `Unexpected Error`,
          message: err.message,
          duration: 5000
        })
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
