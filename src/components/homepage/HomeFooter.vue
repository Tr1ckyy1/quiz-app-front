<template>
  <footer class="sm:z-20 sm:bg-white">
    <section
      class="px-14 py-4 justify-between items-center space-y-8 sm:flex sm:justify-start sm:gap-40 sm:items-start sm:space-y-0 sm:px-24 sm:py-10"
    >
      <div class="border-b py-4 sm:border-none sm:py-0">
        <QuizIcon />
      </div>
      <div class="space-y-4">
        <h1 class="font-bold">Content</h1>
        <p>Quizzes</p>
      </div>
      <div class="space-y-4">
        <h1 class="font-bold">Contact us</h1>
        <p>Email: quizwiz@gmail.com</p>
        <p>Tel: +995 328989</p>
      </div>
      <div class="space-y-4">
        <h1 class="font-bold">Social media</h1>
        <p>Facebook</p>
        <p>Linkedin</p>
      </div>
    </section>
    <p class="border-t pt-6 pb-2 text-[#667085] font-raleway px-14 mt-2 text-sm sm:text-right">
      © 2024 QW. All rights reserved
    </p>
  </footer>
</template>

<script>
import QuizIcon from '@/icons/QuizIcon.vue'

export default {
  components: { QuizIcon }
}
</script>
