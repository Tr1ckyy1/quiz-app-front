<template>
  <div v-if="isLoading" class="flex justify-center items-center my-6">
    <LoadingSpinner />
  </div>

  <section v-else>
    <ul
      v-if="quizzes.length > 0"
      class="my-10 px-4 sm:px-24 space-y-6 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6"
    >
      <QuizCardItem v-for="quiz in quizzes" :key="quiz.id" :quiz="quiz" />
    </ul>
    <p class="px-4 sm:px-24 mb-20 font-bold text-2xl" v-else>No available quizzes</p>
    <button
      v-if="showLoadMoreButton"
      @click="this.loadMore()"
      class="flex items-center rounded-lg py-3 px-5 bg-[#1018280D] hover:brightness-90 gap-3 mx-auto mb-14"
    >
      <LoadMoreIcon />
      <span class="text-blue-main font-semibold">Load more</span>
    </button>
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
      currentPage: 1,
      isLoading: false,
      showLoadMoreButton: true
    }
  },
  methods: {
    async fetchQuizzes() {
      this.isLoading = true
      try {
        const { data } = await getQuizzes({ ...this.$route.query, page: this.currentPage })
        this.quizzes = data.data
        this.showLoadMoreButton = data.meta.last_page > this.currentPage
      } catch (err) {
        console.log(err)
      } finally {
        this.isLoading = false
      }
    },
    async loadMore() {
      this.currentPage++
      const { data } = await getQuizzes({ ...this.$route.query, page: this.currentPage })
      this.quizzes.push(...data.data)
      this.showLoadMoreButton = data.meta.last_page > this.currentPage
    }
  },

  watch: {
    '$route.query': {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.currentPage = 1
          this.quizzes = []
          this.fetchQuizzes()
        }
      }
    }
  }
}
</script>
