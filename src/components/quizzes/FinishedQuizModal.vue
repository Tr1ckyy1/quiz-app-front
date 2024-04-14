<template>
  <div
    class="fixed inset-0 bg-[#101828B2] z-[998] grid backdrop-blur px-4 overflow-y-scroll scrollbar-none"
    @click.self="$emit('close')"
  >
    <div class="w-full bg-white rounded-xl shadow-sm p-6 max-w-96 place-self-center">
      <div v-if="modalLoading" class="flex items-center justify-center gap-4">
        <LoadingSpinner />
        <h1 class="font-semibold text-blue-main">Analyzing results</h1>
      </div>
      <div v-else class="space-y-4">
        <div class="space-y-2 flex flex-col items-center">
          <div
            @click="$emit('close')"
            class="ml-auto sm:w-6 sm:h-6 sm:flex sm:items-center sm:justify-center sm:hover:bg-black/10 sm:rounded-full sm:duration-150 sm:cursor-pointer"
          >
            <CancelIcon />
          </div>
          <QuizFinished />
          <h1 class="font-semibold">Quiz Finished</h1>
          <p class="text-sm">Your results</p>
        </div>
        <ul class="divide-y space-y-4">
          <li class="space-y-2">
            <h2 class="text-[#344054] font-semibold">Quiz name</h2>
            <p class="font-semibold">{{ finishedQuizData?.quiz_name }}</p>
          </li>
          <li class="space-y-2 pt-4">
            <h2 class="text-[#344054] font-semibold">Quiz level</h2>
            <p :style="{ color: finishedQuizData?.difficulty_level.color }">
              {{ finishedQuizData?.difficulty_level.name }}
            </p>
          </li>
          <li class="space-y-2 pt-4">
            <h2 class="text-[#344054] font-semibold">Time</h2>
            <p>{{ finishedQuizData?.time }}</p>
          </li>
          <li class="space-y-2 pt-4">
            <h2 class="text-[#344054] font-semibold">Mistakes</h2>
            <p class="text-[#E64646]">{{ finishedQuizData?.incorrect_questions }}</p>
          </li>
          <li class="space-y-2 pt-4">
            <h2 class="text-[#344054] font-semibold">Right answers</h2>
            <p class="text-[#12B76A]">{{ finishedQuizData?.correct_questions }}</p>
          </li>
        </ul>
        <button
          @click="$emit('close')"
          class="bg-blue-main w-full rounded-lg text-white px-5 py-2.5 sm:hover:brightness-95 sm:duration-150"
        >
          Back to home
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CancelIcon from '@/icons/CancelIcon.vue'
import QuizFinished from '@/icons/QuizFinished.vue'
export default {
  emits: ['close'],
  props: ['modalLoading', 'finishedQuizData'],
  components: { CancelIcon, QuizFinished }
}
</script>
