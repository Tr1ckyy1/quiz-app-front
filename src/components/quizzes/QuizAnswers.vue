<template>
  <li class="space-y-4">
    <div class="flex items-center gap-4">
      <p class="text-blue-main font-semibold border-r pr-4 text-sm sm:text-base">
        Question - {{ index + 1 }}
      </p>
      <p class="text-[#E72A8B] font-semibold text-sm sm:text-base">
        Points - {{ question.points }}
      </p>
    </div>
    <h2 class="font-bold">
      {{ question.name }}
    </h2>
    <div
      v-if="question.correct_answers > 1"
      class="flex items-center gap-2 border border-[#039855] bg-[#039855]/10 py-2.5 px-4 rounded-md"
    >
      <WarningIcon />
      <p class="text-[#027A48] font-semibold text-sm sm:text-base">
        You can select {{ question.correct_answers }} options for this question
      </p>
    </div>
    <div class="space-y-4">
      <label
        class="sm:cursor-pointer flex flex-row-reverse justify-between items-center border rounded-lg p-4"
        v-for="answer in question.answers"
        :key="answer.id"
        :for="`${answer.name}-${answer.id}`"
        :class="
          values[question.id]?.includes(answer.id)
            ? 'border-[#4B69FD66] bg-[#4B69FD66]/10'
            : 'border-[#EAECF0]'
        "
      >
        <div class="relative">
          <Field
            v-model="inputs"
            :name="String(question.id)"
            :value="answer.id"
            :checked="inputs.includes(answer.id)"
            type="checkbox"
            class="peer appearance-none h-4 w-4 rounded-full border checked:bg-blue-main focus:outline-none"
            :id="`${answer.name}-${answer.id}`"
            @click="updateCheckboxSelection(answer.id)"
          />
          <svg
            class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 hidden peer-checked:block"
            width="12"
            height="12"
            viewBox="0 0 10 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.33341 2.5L3.75008 7.08333L1.66675 5"
              stroke="white"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <p
          class="text-sm sm:text-base"
          :class="{
            'text-blue-main': values[question.id]?.includes(answer.id)
          }"
        >
          {{ answer.name }}
        </p>
      </label>
    </div>
  </li>
</template>
<script>
import WarningIcon from '@/icons/show-quiz/WarningIcon.vue'

import { Field } from 'vee-validate'

export default {
  props: ['question', 'index', 'values'],
  data() {
    return { inputs: [] }
  },
  components: { WarningIcon, Field },
  methods: {
    updateCheckboxSelection(selectedAnswer) {
      const index = this.inputs.indexOf(selectedAnswer)
      if (index !== -1) {
        this.inputs.splice(index, 1)
      } else {
        this.inputs.push(selectedAnswer)
      }

      if (this.inputs.length > this.question.correct_answers) {
        this.inputs.shift()
      }
    }
  }
}
</script>
