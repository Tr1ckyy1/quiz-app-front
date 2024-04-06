<template>
  <QuizTopSection :names="names" />
  <QuizCards />
</template>

<script>
import QuizTopSection from '@/components/quizzes/QuizTopSection.vue'
import QuizCards from '@/components/quizzes/QuizCards.vue'
export default {
  components: { QuizTopSection, QuizCards },
  data() {
    return {
      names: [
        { id: 2, name: 'Geography' },
        { id: 3, name: 'Music' },
        { id: 4, name: 'Movies' },
        { id: 5, name: 'Television' },
        { id: 6, name: 'Just for fun' },
        { id: 7, name: 'Personality' },
        { id: 8, name: 'History' },
        { id: 9, name: 'Language' },
        { id: 10, name: 'Literature' },
        { id: 11, name: 'Philosophy' },
        { id: 13, name: 'Math' },
        { id: 14, name: 'Math' },
        { id: 15, name: 'Math' },
        { id: 16, name: 'Math' },
        { id: 17, name: 'Math' },
        { id: 18, name: 'Math' },
        { id: 19, name: 'Math' },
        { id: 20, name: 'Math' },
        { id: 21, name: 'Math' },
        { id: 22, name: 'Math' },
        { id: 23, name: 'Math' },
        { id: 24, name: 'Math' },
        { id: 25, name: 'Math' },
        { id: 26, name: 'Math' },
        { id: 27, name: 'Math' },
        { id: 28, name: 'Math' },
        { id: 29, name: 'Math' }
      ]
    }
  }
}
</script>
