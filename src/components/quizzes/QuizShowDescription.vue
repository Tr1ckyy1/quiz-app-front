<template>
  <div
    class="my-10 space-y-4 divide-[#D0D5DD] divide-y sm:my-0 sm:space-y-0 sm:divide-y-0 sm:divide-x-2 sm:gap-4 sm:flex sm:items-center"
  >
    <div class="sm:pt-0 pt-4 flex items-center gap-3">
      <Hashtag /><span class="text-description-grey font-semibold whitespace-nowrap"
        >{{ totalQuestions }} Questions</span
      >
    </div>
    <div class="sm:pt-0 pt-4 flex items-center gap-3 sm:pl-3">
      <Points /><span class="text-description-grey font-semibold whitespace-nowrap"
        >{{ totalPoints }} Points</span
      >
    </div>
    <div class="sm:pt-0 pt-4 flex items-center gap-3 sm:pl-3">
      <Rocket /><span class="text-description-grey font-semibold whitespace-nowrap"
        >{{ players }} Plays</span
      >
    </div>
    <div class="sm:pt-0 pt-4 flex items-center gap-3 sm:pl-3">
      <Timer /><span class="text-description-grey font-semibold whitespace-nowrap"
        >{{ duration }}m</span
      >
    </div>
  </div>
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
