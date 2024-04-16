<template>
  <div v-if="isLoading" class="flex items-center justify-center mt-10">
    <LoadingSpinner />
  </div>
  <footer v-else class="sm:z-20 sm:bg-white relative py-6 border-t">
    <section
      class="px-14 py-4 justify-between items-center space-y-8 sm:flex sm:justify-start sm:gap-40 sm:items-start sm:space-y-0 sm:px-24 sm:py-10"
    >
      <div class="border-b py-4 sm:border-none sm:py-0">
        <QuizIcon />
      </div>
      <div class="space-y-8">
        <h1 class="font-bold">Content</h1>
        <p class="text-footer-grey">{{ footerInfo?.name }}</p>
      </div>
      <div class="space-y-8">
        <h1 class="font-bold">Contact us</h1>
        <p class="text-footer-grey">Email: {{ footerInfo?.email }}</p>
        <p class="text-footer-grey">Tel: {{ footerInfo?.phone }}</p>
      </div>
      <div class="space-y-8">
        <h1 class="font-bold">Social media</h1>
        <a
          :href="footerInfo?.facebook"
          class="text-footer-grey block sm:hover:underline sm:cursor-pointer"
          target="_blank"
          >Facebook</a
        >
        <a
          :href="footerInfo?.linkedin"
          class="text-footer-grey block sm:hover:underline sm:cursor-pointer"
          target="_blank"
          >Linkedin</a
        >
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
import { getFooterInfo } from '@/services/api/quiz'
export default {
  data() {
    return {
      isLoading: false,
      footerInfo: null
    }
  },
  components: { QuizIcon },
  async mounted() {
    this.isLoading = true
    try {
      const { data } = await getFooterInfo()
      this.footerInfo = data
    } catch (err) {
      console.log(err)
    } finally {
      this.isLoading = false
    }
  }
}
</script>
