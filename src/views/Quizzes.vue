<template>
  <div v-if="isLoading" class="flex justify-center items-center mt-6">
    <LoadingSpinner class="text-gray-200" />
  </div>
  <QuizTopSection v-else />
  <QuizCards />
</template>

<script>
import QuizTopSection from '@/components/quizzes/QuizTopSection.vue'
import QuizCards from '@/components/quizzes/QuizCards.vue'
import { getCategories } from '@/services/api/categories'
export default {
  components: { QuizTopSection, QuizCards },
  data() {
    return {
      isLoading: false
    }
  },
  async mounted() {
    this.isLoading = true
    try {
      const {
        data: { data }
      } = await getCategories()
      this.$store.dispatch('categories/setAllCategories', data)
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
  },
  unmounted() {
    this.$store.dispatch('filter/setAllCategories', [])
    this.$store.dispatch('filter/setAllLevels', [])
    this.$store.dispatch('filter/setSort', '')
  }
}
</script>
