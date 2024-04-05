<template>
  <Form
    @submit="onSubmit"
    ref="formRef"
    class="fixed inset-0 bg-gray-100 sm:bg-white z-[299] overflow-y-scroll sm:absolute sm:inset-auto sm:w-[70rem] sm:top-full sm:overflow-hidden sm:mt-2 sm:-right-0 sm:border sm:border-black sm:rounded-xl sm:py-8 sm:px-4 sm:-shadow-sm"
  >
    <nav class="p-6 block sm:hidden">
      <ul class="flex justify-between items-center">
        <li>
          <button @click="customReset" type="button">Reset</button>
        </li>
        <li>FILTER</li>
        <li @click="$emit('close')"><CancelIcon /></li>
      </ul>
    </nav>
    <div class="sm:flex sm:gap-4 sm:justify-between sm:items-center sm:px-4">
      <div class="hidden sm:block">
        <div
          @click="toggleFilter"
          class="flex items-center gap-4 bg-black border border-[#66708599] py-2 px-3 rounded-xl outline-none shrink-0"
        >
          <FilterIcon class="fill-white" />
          <p class="text-white">Filter</p>
        </div>
      </div>
      <div
        class="flex flex-1 items-center relative border-y border-y-filter-grey py-6 sm:py-0 sm:border-none sm:bg-transparent bg-white"
      >
        <input
          id="search_filter"
          type="text"
          class="outline-none px-10 w-full sm:border sm:rounded-3xl sm:py-2 sm:focus:border-blue-main"
          placeholder="Search"
          v-model="search"
        />
        <label for="search_filter" class="absolute top-1/2 left-4 -translate-y-1/2">
          <SearchIcon />
        </label>
      </div>
      <div v-if="showButtons" class="sm:flex hidden gap-4 items-center">
        <button
          class="bg-blue-main text-white py-2 px-6 font-semibold rounded-xl hover:brightness-90"
        >
          Confirm
        </button>
        <span>|</span>
        <button
          @click="customReset"
          type="button"
          class="text-[#667085] hover:underline duration-100"
        >
          Reset all filters
        </button>
      </div>
      <div
        @click="$emit('close')"
        class="hidden sm:flex w-8 h-8 hover:bg-black/10 duration-150 rounded-full items-center justify-center cursor-pointer"
      >
        <CancelIcon />
      </div>
    </div>
    <div class="px-6 my-8 block sm:hidden">
      <div class="flex rounded-3xl bg-filter-grey/40">
        <button
          @click="activeElement = 'filter'"
          type="button"
          class="p-4 flex-1 rounded-3xl font-semibold border"
          :class="isFilterActive"
        >
          Filter
        </button>
        <button
          @click="activeElement = 'sort'"
          type="button"
          class="flex-1 rounded-3xl border font-semibold"
          :class="isSortActive"
        >
          Sorting
        </button>
      </div>
    </div>
    <div class="sm:w-full sm:grid sm:grid-cols-[65%_auto] sm:mt-4 sm:gap-2">
      <div class="p-6 sm:p-4 sm:border sm:rounded-xl sm:border-filter-grey sm:basis-2/3">
        <div class="space-y-4" v-show="activeElement === 'filter'">
          <div v-if="isAuthenticated" class="space-y-6">
            <h2 class="hidden sm:block text-blue-main font-semibold">Filter by</h2>
            <FilterCheckbox name="my_quizzes" title="My quizzes" />
            <FilterCheckbox name="not_completed" title="Not completed" />
          </div>

          <div class="border-y py-4 space-y-6">
            <h2 class="font-semibold">Levels</h2>
            <ul class="flex flex-wrap gap-4">
              <QuizLevelItem v-for="level in filteredLevels" :key="level" :title="level" />
            </ul>
          </div>

          <div class="space-y-4">
            <h2 class="font-semibold">Categories</h2>
            <ul class="flex flex-wrap gap-4">
              <QuizCategoryItem
                v-for="item in filteredCategories"
                :key="item.id"
                :id="item.id"
                :name="item.name"
                mode="filter"
              />
            </ul>
          </div>
        </div>

        <ul v-show="activeElement !== 'filter'" class="space-y-6 sm:hidden">
          <li class="flex items-center gap-4 pl-2">
            <CancelIcon /><span class="font-semibold text-[#475467]">A-Z</span>
          </li>
          <li class="flex items-center gap-4 pl-2">
            <CancelIcon /><span class="font-semibold text-[#475467]">Z-A</span>
          </li>
          <li class="flex items-center gap-4 pl-2">
            <CancelIcon /><span class="font-semibold text-[#475467]">Most popular</span>
          </li>
          <li class="flex items-center gap-4 pl-2">
            <CancelIcon /><span class="font-semibold text-[#475467]">Newest</span>
          </li>
          <li class="flex items-center gap-4 pl-2">
            <CancelIcon /><span class="font-semibold text-[#475467]">Oldest</span>
          </li>
        </ul>
        <div v-if="showButtons" class="sm:hidden flex gap-2 mt-6">
          <button class="bg-blue-main text-white py-2.5 px-6 font-semibold basis-2/3 rounded-xl">
            Confirm
          </button>
          <button
            @click="customReset"
            type="button"
            class="border border-filter-grey py-2.5 px-5 rounded-lg basis-1/3"
          >
            Cancel
          </button>
        </div>
      </div>
      <ul
        class="hidden sm:block sm:p-4 sm:border sm:rounded-xl sm:border-filter-grey basis-1/3 h-full space-y-6"
      >
        <h2 class="text-blue-main font-semibold">Sort by</h2>
        <li class="flex items-center gap-4 pl-2">
          <CancelIcon /><span class="font-semibold text-[#475467]">A-Z</span>
        </li>
        <li class="flex items-center gap-4 pl-2">
          <CancelIcon /><span class="font-semibold text-[#475467]">Z-A</span>
        </li>
        <li class="flex items-center gap-4 pl-2">
          <CancelIcon /><span class="font-semibold text-[#475467]">Most popular</span>
        </li>
        <li class="flex items-center gap-4 pl-2">
          <CancelIcon /><span class="font-semibold text-[#475467]">Newest</span>
        </li>
        <li class="flex items-center gap-4 pl-2">
          <CancelIcon /><span class="font-semibold text-[#475467]">Oldest</span>
        </li>
      </ul>
    </div>
  </Form>
</template>

<script>
import SearchIcon from '@/icons/SearchIcon.vue'
import CancelIcon from '@/icons/CancelIcon.vue'
import FilterIcon from '@/icons/FilterIcon.vue'
import FilterCheckbox from './FilterCheckbox.vue'
import QuizLevelItem from './QuizLevelItem.vue'
import QuizCategoryItem from './QuizCategoryItem.vue'
import { Form, Field } from 'vee-validate'

export default {
  emits: ['close'],
  props: ['isShowing', 'names'],
  components: {
    Form,
    Field,
    SearchIcon,
    CancelIcon,
    FilterIcon,
    FilterCheckbox,
    QuizLevelItem,
    QuizCategoryItem
  },

  data() {
    return {
      search: '',
      activeElement: 'filter',
      quizzesChecked: false,
      notCompletedChecked: false,
      categoriesSelected: false,
      levels: ['Starter', 'Beginner', 'Middle', 'High', 'Very high', 'Dangerously high']
    }
  },
  methods: {
    onSubmit(values) {
      console.log(values)
    },
    customReset() {
      const formRef = this.$refs.formRef
      formRef.resetForm()
      this.search = ''
      this.activeElement = 'filter'
      this.$store.dispatch('quizzes/removeAllCategories')
      this.$store.dispatch('quizzes/removeAllLevels')
      this.names.filter((item) => {
        if (this.$route.query[`id${item.id}`] === item.name)
          this.$store.dispatch('quizzes/addOnce', item.name)
      })
    }
  },
  computed: {
    filteredCategories() {
      return this.names.filter((item) =>
        item.name.toLowerCase().includes(this.search.toLowerCase())
      )
    },
    filteredLevels() {
      return this.levels.filter((level) => level.toLowerCase().includes(this.search.toLowerCase()))
    },
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    },
    isFilterActive() {
      return this.activeElement === 'filter'
        ? 'text-blue-main border-filter-grey bg-white'
        : 'text-[#66708580]  bg-transparent border-transparent'
    },
    isSortActive() {
      return this.activeElement === 'sort'
        ? 'text-blue-main border-filter-grey bg-white'
        : 'text-[#66708580]  bg-transparent border-transparent'
    },
    showButtons() {
      const formRef = this.$refs.formRef
      return (
        this.$store.getters['quizzes/getCategoriesInFilter'].length > 0 ||
        this.$store.getters['quizzes/getLevelsInFilter'].length > 0 ||
        (formRef && formRef.values.my_quizzes) ||
        (formRef && formRef.values.not_completed)
      )
    }
  }
}
</script>
