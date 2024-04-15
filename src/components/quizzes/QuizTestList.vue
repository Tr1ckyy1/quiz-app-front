<template>
  <li class="flex items-center gap-3 border-r-2 pr-3">
    <Hashtag /><span class="text-description-grey font-semibold whitespace-nowrap"
      >{{ totalQuestions }} Questions</span
    >
  </li>
  <li class="flex items-center gap-3 border-r-2 pr-3">
    <Points /><span class="text-description-grey font-semibold whitespace-nowrap"
      >{{ totalPoints }} Points</span
    >
  </li>
  <li class="flex items-center gap-3 border-r-2 pr-3">
    <Rocket /><span class="text-description-grey font-semibold whitespace-nowrap"
      >{{ players }} Plays</span
    >
  </li>
  <li class="flex items-center gap-3">
    <Timer /><span class="text-description-grey font-semibold whitespace-nowrap"
      >{{ duration }}m</span
    >
  </li>
</template>

<script>
import Hashtag from '@/icons/show-quiz/Hashtag.vue'
import Points from '@/icons/show-quiz/Points.vue'
import Rocket from '@/icons/show-quiz/Rocket.vue'
import Timer from '@/icons/show-quiz/Timer.vue'

export default {
  props: ['totalQuestions', 'totalPoints', 'duration', 'players'],
  components: { Hashtag, Points, Rocket, Timer }
}
</script>
