<template>
  <li>
    <RouterLink
      :to="{ name: 'showQuiz', params: { quizId: quiz.id } }"
      class="group h-full flex flex-col p-6 gap-3 cursor-pointer sm:duration-300"
      :class="checkSimilarQuizzes"
    >
      <div>
        <img :src="quiz.image" class="rounded-lg w-full max-h-60 object-cover" />
      </div>
      <ul class="flex flex-wrap gap-x-6 gap-y-2">
        <li
          v-for="(category, index) in quiz.categories"
          :key="category.id"
          class="text-blue-main font-semibold relative"
          :class="{
            'before:absolute before:w-1 before:h-1 before:rounded-full before:bg-[#D0D5DD] before:top-1/2 before:-translate-y-1/2 before:left-full before:ml-2.5':
              index !== quiz.categories.length - 1
          }"
        >
          {{ category.name }}
        </li>
      </ul>
      <div class="flex items-center justify-between">
        <h1 class="font-semibold text-2xl">{{ quiz.title }}</h1>
        <LinkIcon class="hidden group-hover:block" />
      </div>
      <div class="flex gap-6 flex-wrap">
        <div class="flex items-center gap-4">
          <div
            class="w-10 h-10 rounded-full shrink-0 flex items-center justify-center"
            :class="completedOrNot"
          >
            <QuizCompletedIcon v-if="userLoggedIn" />
            <QuizNotCompletedIcon v-else />
          </div>
          <div class="text-sm">
            <h2 class="font-semibold">
              {{ userLoggedIn ? 'Completed' : 'Not Completed' }}
            </h2>
            <p v-if="userLoggedIn">{{ quizCompletedDate }}</p>
            <p class="text-[#4754674D]" v-else>Date,Time</p>
          </div>
        </div>
        <div class="text-sm">
          <h2 class="font-semibold">Total time</h2>
          <p v-if="userLoggedIn">
            {{ quiz.user_time }}{{ quiz.user_time && quiz.user_time > 1 ? 'Minutes' : 'Minute' }}
          </p>
          <p v-else class="text-[#4754674D]">N/A</p>
        </div>
        <div class="text-sm">
          <h2 class="font-semibold">Total users</h2>
          <p>{{ quiz.total_users }}</p>
        </div>
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-full shrink-0 flex items-center justify-center"
            :style="{ 'background-color': quiz.difficulty_level.bg_color_normal }"
          >
            <component :is="difficultyLevelIcon" />
          </div>
          <div class="text-sm">
            <h2 class="font-semibold">Difficulty level</h2>
            <p>{{ quiz.difficulty_level.name }}</p>
          </div>
        </div>

        <div v-if="userLoggedIn" class="flex items-center gap-3">
          <div
            class="w-10 h-10 bg-[#FCE7F6] rounded-full shrink-0 flex items-center justify-center"
          >
            <PointsIcon />
          </div>
          <div class="text-sm">
            <h2 class="font-semibold">Points</h2>
            <p>{{ quiz.user_points }}/{{ quiz.total_points }}</p>
          </div>
        </div>
      </div>
    </RouterLink>
  </li>
</template>

<script>
import LinkIcon from '@/icons/LinkIcon.vue'
import QuizCompletedIcon from '@/icons/QuizCompletedIcon.vue'
import QuizNotCompletedIcon from '@/icons/QuizNotCompletedIcon.vue'
import PointsIcon from '@/icons/PointsIcon.vue'
import LevelStarter from '@/icons/levels/LevelStarter.vue'
import LevelBeginner from '@/icons/levels/LevelBeginner.vue'
import LevelMiddle from '@/icons/levels/LevelMiddle.vue'
import LevelHigh from '@/icons/levels/LevelHigh.vue'
import LevelVeryHigh from '@/icons/levels/LevelVeryHigh.vue'
import LevelDangerouslyHigh from '@/icons/levels/LevelDangerouslyHigh.vue'
export default {
  props: ['quiz', 'mode'],

  components: {
    LinkIcon,
    QuizCompletedIcon,
    QuizNotCompletedIcon,
    PointsIcon,
    LevelStarter,
    LevelBeginner,
    LevelMiddle,
    LevelHigh,
    LevelVeryHigh,
    LevelDangerouslyHigh
  },
  computed: {
    checkSimilarQuizzes() {
      return this.mode === 'similar'
        ? 'bg-[#D0D5DD]/20 border border-[#D0D5DD] rounded-lg sm:hover:border-black active:border-black'
        : 'sm:hover:ring-1 sm:hover:rounded-xl sm:hover:ring-black  active:ring-1 active:ring-black shadow-lg'
    },
    userLoggedIn() {
      return this.$store.getters['auth/isAuthenticated'] && this.quiz.user_completed
    },
    completedOrNot() {
      return this.userLoggedIn && this.quiz.user_completed ? 'bg-[#D1FADF]' : 'bg-[#F6F6F7]'
    },
    quizCompletedDate() {
      const date = new Date(this.quiz.quiz_completed_at)
      const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
      return formattedDate
    },
    difficultyLevelIcon() {
      const difficultyName = this.quiz.difficulty_level.name.toLowerCase()
      switch (difficultyName) {
        case 'starter':
          return 'LevelStarter'
        case 'beginner':
          return 'LevelBeginner'
        case 'middle':
          return 'LevelMiddle'
        case 'high':
          return 'LevelHigh'
        case 'very high':
          return 'LevelVeryHigh'
        case 'dangerously high':
          return 'LevelDangerouslyHigh'
        default:
          return ''
      }
    }
  }
}
</script>
