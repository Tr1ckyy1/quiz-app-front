<template>
  <div class="flex flex-col items-center justify-center sm:items-start sm:justify-start">
    <div class="sm:px-24">
      <img class="hidden sm:block" src="@/assets/quizwiz-desktop.png" />
      <img class="sm:hidden" src="@/assets/MobileFrame.png" />
    </div>

    <img
      src="@/assets/main-picture-desktop.png"
      class="hidden sm:block absolute z-10 top-30 right-0"
    />

    <div class="-mt-32 w-full z-20 sm:mt-28 sm:z-0">
      <div class="bg-red-main w-full p-14 sm:px-24">
        <h1 class="font-black text-white text-[80px] flex flex-col gap-5 font-raleway">
          200+
          <RouterLink
            to="/quizzes"
            class="flex underline items-center gap-4 sm:no-underline sm:hover:underline sm:duration-150 text-5xl"
            >Quiz games <ArrowUpIcon class="sm:hidden"
          /></RouterLink>
        </h1>
      </div>

      <div class="p-14 bg-blue-main w-full sm:px-24">
        <h1 class="font-black text-white flex flex-col gap-5 font-raleway text-[80px]">
          250+
          <RouterLink
            to="/quizzes"
            class="flex underline items-center gap-4 sm:no-underline sm:hover:underline sm:duration-150 text-5xl"
            >Different genre <ArrowUpIcon class="sm:hidden" />
          </RouterLink>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import ArrowUpIcon from '@/icons/ArrowUpIcon.vue'

export default {
  components: { ArrowUpIcon }
}
</script>
