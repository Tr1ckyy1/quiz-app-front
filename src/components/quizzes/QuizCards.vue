<template>
  <section>
    <div
      class="my-10 px-4 sm:px-24 space-y-6 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-8 sm:gap-y-16"
    >
      <QuizCardItem />
      <QuizCardItem />
      <QuizCardItem />
      <QuizCardItem />
      <QuizCardItem />
      <QuizCardItem />
    </div>
    <button
      class="flex items-center rounded-lg py-3 px-5 bg-[#1018280D] hover:brightness-90 gap-3 mx-auto mb-14"
    >
      <LoadMoreIcon />
      <span class="text-blue-main font-semibold">Load more</span>
    </button>
  </section>
</template>

<script>
import QuizCardItem from './QuizCardItem.vue'
import LoadMoreIcon from '@/icons/LoadMoreIcon.vue'
export default {
  components: { QuizCardItem, LoadMoreIcon }
}
</script>
