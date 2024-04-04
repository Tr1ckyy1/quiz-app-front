<template>
  <div class="flex items-center gap-4">
    <label class="font-semibold" :for="name">{{ title }}</label>
    <div class="relative flex items-center justify-center">
      <Field
        :value="true"
        :name="name"
        type="checkbox"
        :id="name"
        class="peer appearance-none h-5 w-5 border-2 rounded-md checked:border-[#7F56D9] checked:bg-[#F9F5FF] outline-none sm:checked:bg-black sm:checked:border-black"
      />
      <label
        :for="name"
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 peer-checked:opacity-100 opacity-0"
      >
        <svg
          class="sm:block hidden"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 3L4.5 8.5L2 6"
            stroke="white"
            stroke-width="1.6666"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <svg
          class="block sm:hidden"
          width="12"
          height="9"
          viewBox="0 0 12 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.6668 1.5L4.25016 7.91667L1.3335 5"
            stroke="#7F56D9"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </label>
    </div>
  </div>
</template>

<script>
import { Field } from 'vee-validate'
export default {
  props: ['title', 'name'],
  components: { Field }
}
</script>
