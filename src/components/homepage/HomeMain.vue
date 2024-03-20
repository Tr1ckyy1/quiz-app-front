<template>
  <main class="relative">
    <div class="flex flex-col items-center justify-center sm:items-start sm:justify-start">
      <div class="sm:px-24 relative w-full">
        <img class="hidden sm:block" src="../../assets/quizwiz-desktop.png" />
        <img class="sm:hidden" src="../../assets/MobileFrame.png" />
        <img
          src="../../assets/main-picture-desktop.png"
          class="hidden sm:block absolute z-10 top-6 right-0"
        />
      </div>

      <div class="-mt-32 w-full z-20 sm:mt-28 sm:z-0">
        <div class="bg-red-main w-full p-14 sm:px-24">
          <h1 class="font-black text-white text-4xl sm:text-7xl flex flex-col gap-2 font-raleway">
            200+
            <RouterLink
              to="/quizzes"
              class="flex underline items-center gap-4 sm:no-underline sm:hover:underline sm:duration-150"
              >Quiz games <ArrowUpIcon
            /></RouterLink>
          </h1>
        </div>

        <div class="p-14 bg-blue-main w-full sm:px-24">
          <h1 class="font-black text-white text-4xl flex flex-col gap-2 font-raleway sm:text-7xl">
            250+
            <RouterLink
              to="/quizzes"
              class="flex underline items-center gap-4 sm:no-underline sm:hover:underline sm:duration-150"
              >Different genre <ArrowUpIcon />
            </RouterLink>
          </h1>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ArrowUpIcon from '@/icons/ArrowUpIcon.vue'

export default {
  components: { ArrowUpIcon }
}
</script>
