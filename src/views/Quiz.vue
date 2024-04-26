<template>
  <div v-if="isLoading" class="flex justify-center items-center my-6 h-full">
    <LoadingSpinner />
  </div>
  <section v-else-if="!isLoading && quiz" class="px-4 sm:px-24 py-6">
    <button
      class="hidden sm:flex items-center gap-1 hover:underline duration-100"
      @click="$router.go(-1)"
    >
      <GoBack />
      <p>Back</p>
    </button>
    <div class="sm:flex sm:gap-10">
      <div class="sm:basis-2/3">
        <div class="space-y-4 sm:space-y-0 sm:flex sm:mt-4 sm:gap-10">
          <div class="sm:space-y-6 space-y-4">
            <div class="flex flex-col gap-3 sm:flex-col-reverse">
              <ul class="flex gap-x-4 gap-y-2 flex-wrap">
                <li
                  v-for="(category, index) in quiz?.categories"
                  :key="category.id"
                  class="text-blue-main font-semibold relative"
                  :class="{
                    'before:absolute before:w-1 before:h-1 before:rounded-full before:bg-[#D0D5DD] before:top-1/2 before:-translate-y-1/2 before:left-full before:ml-1.5':
                      index !== quiz?.categories.length - 1
                  }"
                >
                  {{ category.name }}
                </li>
              </ul>
              <h1 class="font-bold text-4xl font-raleway">
                {{ quiz?.title }}
              </h1>
            </div>
            <p>{{ quiz?.intro_question }}</p>
            <QuizShowDescription
              class="hidden sm:block"
              :totalQuestions="quiz?.total_questions"
              :totalPoints="quiz?.total_points"
              :duration="quiz?.duration"
              :players="quiz?.total_users"
            />
            <p
              class="hidden sm:block text-red-500 font-bold text-2xl pt-2"
              v-if="quiz?.user_completed"
            >
              You have already completed this quiz!
            </p>
            <RouterLink
              v-else
              :to="startQuiz"
              class="hidden sm:inline-block bg-blue-main w-2/3 text-white font-semibold py-3 px-6 text-center rounded-[10px] outline-none hover:brightness-95"
              >Start quiz</RouterLink
            >
          </div>
          <div>
            <img :src="quiz?.image" class="aspect-[3/2] object-cover rounded-[20px]" />
          </div>
        </div>
        <div class="hidden sm:block border-t mt-10 pt-6 space-y-2">
          <h1 class="font-bold text-2xl">Instructions</h1>
          <p>{{ quiz?.instructions }}</p>
        </div>
      </div>
      <QuizShowDescription
        class="block sm:hidden"
        :totalQuestions="quiz?.total_questions"
        :totalPoints="quiz?.total_points"
        :duration="quiz?.duration"
      />
      <p class="block sm:hidden text-red-500 font-bold text-2xl" v-if="quiz?.user_completed">
        You have already completed this quiz!
      </p>
      <RouterLink
        v-else
        :to="startQuiz"
        class="block sm:hidden bg-blue-main w-full text-white font-semibold py-3 px-6 text-center rounded-[10px]"
        >Start quiz</RouterLink
      >
      <div v-if="similarQuizzesLoading" class="flex basis-1/3 items-center justify-center">
        <LoadingSpinner />
      </div>
      <ul
        v-else-if="!similarQuizzesLoading && similarQuizzes?.length > 0"
        class="basis-1/3 mt-4 hidden sm:block space-y-10"
      >
        <QuizCardItem mode="similar" v-for="quiz in similarQuizzes" :key="quiz.id" :quiz="quiz" />
      </ul>
    </div>
  </section>
</template>

<script>
import {
  getQuiz as getQuizApi,
  getSimilarQuizzes as getSimilarQuizzesApi
} from '@/services/api/quiz'
import GoBack from '@/icons/GoBack.vue'
import QuizShowDescription from '@/components/quizzes/QuizShowDescription.vue'
import QuizCardItem from '@/components/quizzes/QuizCardItem.vue'
export default {
  props: ['quizId'],
  components: { QuizShowDescription, GoBack, QuizCardItem },
  data() {
    return {
      isLoading: false,
      quiz: null,
      similarQuizzes: [],
      similarQuizzesLoading: false
    }
  },
  computed: {
    startQuiz() {
      return `/quizzes/${this.quizId}/test`
    }
  },
  watch: {
    quizId(id) {
      this.getQuiz(id)
    }
  },
  methods: {
    async getQuiz(id) {
      this.isLoading = true
      try {
        const {
          data: { data: quiz }
        } = await getQuizApi(id)
        this.quiz = quiz
        const categoryIds = quiz.categories.map((category) => category.id)

        this.getSimilarQuizzes(categoryIds, quiz.id)
      } catch (err) {
        console.log(err)
      } finally {
        this.isLoading = false
      }
    },
    async getSimilarQuizzes(categoryIds, excludeId) {
      this.similarQuizzesLoading = true
      try {
        const {
          data: { data: quizzes }
        } = await getSimilarQuizzesApi(categoryIds, excludeId)
        this.similarQuizzes = quizzes
      } catch (err) {
        console.log(err)
      } finally {
        this.similarQuizzesLoading = false
      }
    }
  },
  mounted() {
    this.getQuiz(this.quizId)
  }
}
</script>
