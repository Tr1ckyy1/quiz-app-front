<template>
  <Transition
    enter-active-class="duration-150"
    leave-active-class="duration-150"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <FinishedQuizModal
      v-if="modalOpen"
      :modalLoading="modalLoading"
      :finishedQuizData="finishedQuizData"
      @close="$router.replace('/quizzes')"
    />
  </Transition>
  <ToastMessage :toast="toast" />
  <div v-if="isLoading" class="flex items-center justify-center h-screen">
    <LoadingSpinner class="text-gray-200" />
  </div>

  <Form
    v-else-if="!isLoading && quiz"
    @submit="submitQuiz"
    class="pb-10"
    v-slot="{ values }"
    ref="formRef"
  >
    <header
      class="p-4 sm:px-24 top-0 w-full sticky bg-white z-[300] space-y-4 sm:space-y-0 shadow-md sm:shadow-none sm:border-b sm:py-6"
    >
      <RouterLink
        :to="{ name: 'showQuiz', params: { quizId } }"
        class="sm:ml-auto sm:w-8 sm:h-8 sm:rounded-full sm:flex sm:items-center sm:justify-center sm:hover:bg-black/10 sm:cursor-pointer sm:duration-300"
      >
        <CancelIcon class="ml-auto sm:m-0" @click="$router.go(-1)" />
      </RouterLink>
      <div class="flex sm:hidden border-y py-4 gap-3">
        <button class="bg-blue-main py-2.5 px-6 rounded-[10px] basis-2/3 text-white font-bold">
          Submit
        </button>
        <div
          class="bg-[#F6F6F7] border border-[#D0D5DD] rounded-lg flex flex-col py-2.5 font-semibold basis-1/3 px-4"
        >
          <h2 class="font-raleway">Timer</h2>
          <p class="whitespace-nowrap">{{ formattedTime }}</p>
        </div>
      </div>
    </header>
    <div class="space-y-6 my-8 sm:my-14">
      <h1 class="text-center text-4xl font-bold">{{ quiz?.title }}</h1>
      <ul class="flex gap-x-4 gap-y-2 justify-center items-center flex-wrap px-10">
        <PinIcon />
        <li
          v-for="(category, index) in quiz?.categories"
          :key="category.id"
          class="text-[#667085] font-semibold relative"
          :class="styledList(index)"
        >
          {{ category.name }}
        </li>
        <QuizTestList
          :totalQuestions="quiz?.total_questions"
          :totalPoints="quiz?.total_points"
          :duration="quiz?.duration"
          :players="quiz?.total_users"
        />
      </ul>
    </div>

    <div class="px-4 sm:px-24 sm:flex sm:gap-10">
      <ul class="space-y-14 sm:basis-2/3">
        <QuizAnswers
          v-for="(question, index) in quiz?.questions"
          :key="question.id"
          :question="question"
          :index="index"
          :values="values"
        />
      </ul>
      <div
        class="hidden w-96 h-fit pt-14 px-10 pb-6 shadow-lg relative rounded-lg border sm:flex flex-col items-center justify-center gap-8"
      >
        <div
          class="absolute rounded-lg shadow-lg py-4 border -translate-x-1/2 -translate-y-1/2 top-0 left-1/2 z-10 bg-white px-10"
        >
          <h2 class="text-center">Timer</h2>
        </div>
        <h1
          class="w-full font-semibold text-5xl tracking-[0.2em] border-b text-center text-[#475467] pb-4"
        >
          {{ formattedTime }}
        </h1>
        <button class="py-2.5 px-6 bg-blue-main rounded-[10px] text-white w-full">Submit</button>
      </div>
    </div>
  </Form>
</template>

<script>
import PinIcon from '@/icons/show-quiz/PinIcon.vue'
import CancelIcon from '@/icons/CancelIcon.vue'
import QuizTestList from '@/components/quizzes/QuizTestList.vue'
import QuizAnswers from '@/components/quizzes/QuizAnswers.vue'
import FinishedQuizModal from '@/components/quizzes/FinishedQuizModal.vue'
import { Form } from 'vee-validate'
import { getQuiz as getQuizApi } from '@/services/api/quiz'
import { submitQuiz as submitQuizApi } from '@/services/api/quiz'
export default {
  props: ['quizId'],
  components: { QuizAnswers, CancelIcon, PinIcon, QuizTestList, Form, FinishedQuizModal },
  data() {
    return {
      quiz: null,
      isLoading: false,
      timer: null,
      totalTime: null,
      modalOpen: false,
      modalLoading: false,
      finishedQuizData: null
    }
  },
  computed: {
    styledList() {
      return (index) => {
        return index !== this.quiz?.categories?.length - 1
          ? 'before:absolute before:w-1 before:h-1 before:rounded-full before:bg-[#D0D5DD] before:top-1/2 before:-translate-y-1/2 before:left-full before:ml-1.5'
          : 'border-r-2 pr-3'
      }
    },
    formattedTime() {
      if (this.totalTime) {
        const minutes = Math.floor(this.totalTime / 60)
        const seconds = this.totalTime % 60
        return `${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`
      } else {
        return '00:00'
      }
    },
    toast() {
      return this.$store.getters['toast/toastValues']
    },
    userLoggedIn() {
      return this.$store.getters['auth/isAuthenticated']
    }
  },

  methods: {
    async submitQuiz(values) {
      try {
        this.modalOpen = true
        this.modalLoading = true
        if (this.timer) {
          clearInterval(this.timer)
        }
        const { data } = await submitQuizApi({
          quizId: this.quizId,
          values,
          totalTime: this.totalTime
        })
        this.finishedQuizData = data
      } catch (err) {
        if (err.response.data.error) {
          this.$router.replace('/quizzes')
        }
        this.$store.dispatch('toast/setToast', {
          type: 'error',
          text: 'Error',
          message: err.response.data?.error ?? err.message,
          duration: 5000
        })
      } finally {
        this.modalLoading = false
      }
    },
    async getQuiz(id) {
      this.isLoading = true
      try {
        const {
          data: { data: quiz }
        } = await getQuizApi(id, true)
        this.quiz = quiz
        this.totalTime = quiz.duration * 60
        this.startTimer()
      } catch (err) {
        console.log(err)
      } finally {
        this.isLoading = false
      }
    },
    startTimer() {
      this.timer = setInterval(() => {
        if (this.totalTime > 0) {
          this.totalTime--
        } else {
          this.clearTimer()
          this.submitQuiz(this.$refs.formRef.values)
        }
      }, 1000)
    },
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    }
  },
  watch: {
    quiz(val) {
      if (val.user_completed) {
        this.$router.replace('/quizzes')
      }
    }
  },

  mounted() {
    this.getQuiz(this.quizId)
  },
  beforeUnmount() {
    this.clearTimer()
  }
}
</script>
