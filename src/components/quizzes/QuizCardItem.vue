<template>
  <RouterLink
    to="/quizzes/quiz-1"
    class="group flex flex-col shadow-lg p-6 gap-2 cursor-pointer sm:hover:ring-1 rounded-xl sm:hover:ring-black sm:duration-300 active:ring-1 active:ring-black"
  >
    <img src="@/assets/card-for-test.png" />
    <ul class="flex wrap gap-6">
      <li class="text-blue-main font-semibold">Geography</li>
      <li class="text-blue-main font-semibold">World</li>
    </ul>
    <div class="flex items-center justify-between">
      <h1 class="font-semibold text-lg">British Overseas Flags</h1>
      <LinkIcon class="hidden group-hover:block" />
    </div>
    <div class="flex gap-8 flex-wrap">
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 bg-[#D1FADF] rounded-full shrink-0"></div>
        <div class="text-sm">
          <h2 class="font-semibold">Completed</h2>
          <p>20 Jan, 2022</p>
        </div>
      </div>
      <div class="text-sm">
        <h2 class="font-semibold">Total time</h2>
        <p>12Minute</p>
      </div>
      <div class="text-sm">
        <h2 class="font-semibold">Total users</h2>
        <p>54</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-[#F4EBFF] rounded-full shrink-0"></div>
        <div class="text-sm">
          <h2 class="font-semibold">Difficulty level</h2>
          <p>Middle</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-[#FCE7F6] rounded-full shrink-0"></div>
        <div class="text-sm">
          <h2 class="font-semibold">Points</h2>
          <p>10/10</p>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script>
import LinkIcon from '@/icons/LinkIcon.vue'
export default {
  components: { LinkIcon }
}
</script>
