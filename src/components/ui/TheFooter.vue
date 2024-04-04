<template>
  <footer class="sm:z-20 sm:bg-white relative py-6 border-t">
    <section
      class="px-14 py-4 justify-between items-center space-y-8 sm:flex sm:justify-start sm:gap-40 sm:items-start sm:space-y-0 sm:px-24 sm:py-10"
    >
      <div class="border-b py-4 sm:border-none sm:py-0">
        <QuizIcon />
      </div>
      <div class="space-y-8">
        <h1 class="font-bold">Content</h1>
        <p class="text-footer-grey">Quizzes</p>
      </div>
      <div class="space-y-8">
        <h1 class="font-bold">Contact us</h1>
        <p class="text-footer-grey">Email: quizwiz@gmail.com</p>
        <p class="text-footer-grey">Tel: +995 328989</p>
      </div>
      <div class="space-y-8">
        <h1 class="font-bold">Social media</h1>
        <p class="text-footer-grey">Facebook</p>
        <p class="text-footer-grey">Linkedin</p>
      </div>
    </section>
    <p
      class="border-t pt-6 pb-2 text-[#667085] font-raleway px-14 mt-2 text-sm sm:text-right sm:px-24"
    >
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
