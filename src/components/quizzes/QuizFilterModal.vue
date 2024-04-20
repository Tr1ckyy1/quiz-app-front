<template>
  <form
    @submit.prevent="onSubmit"
    ref="formRef"
    class="fixed inset-0 bg-gray-100 sm:bg-white z-[350] sm:z-[250] overflow-y-scroll sm:absolute sm:inset-auto sm:w-[70rem] sm:top-full sm:overflow-hidden sm:mt-2 sm:-right-0 sm:border sm:border-black sm:rounded-xl sm:p-4 sm:-shadow-sm"
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
    <div
      class="sm:flex sm:gap-4 sm:justify-between sm:items-center bg-[#F6F6F6B2] rounded-xl sm:p-4"
    >
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
          @click.stop="customReset"
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
            <div class="flex items-center gap-4">
              <label class="font-semibold sm:cursor-pointer" for="filter-my-quizzes"
                >My quizzes</label
              >
              <div class="relative flex items-center justify-center">
                <input
                  v-model="myQuizzesChecked"
                  name="my_quizzes"
                  type="checkbox"
                  id="filter-my-quizzes"
                  class="sm:cursor-pointer peer appearance-none h-5 w-5 border-2 rounded-md checked:border-[#7F56D9] checked:bg-[#F9F5FF] outline-none sm:checked:bg-black sm:checked:border-black"
                />
                <FilterCheckbox select="filter-my-quizzes" />
              </div>
            </div>

            <div class="flex items-center gap-4">
              <label class="font-semibold sm:cursor-pointer" for="filter-not-completed"
                >Not completed</label
              >
              <div class="relative flex items-center justify-center">
                <input
                  v-model="notCompletedChecked"
                  name="not_completed"
                  type="checkbox"
                  id="filter-not-completed"
                  class="sm:cursor-pointer peer appearance-none h-5 w-5 border-2 rounded-md checked:border-[#7F56D9] checked:bg-[#F9F5FF] outline-none sm:checked:bg-black sm:checked:border-black"
                />
                <FilterCheckbox select="filter-not-completed" />
              </div>
            </div>
          </div>

          <div class="border-y py-4 space-y-6">
            <h2 class="font-semibold">Levels</h2>
            <ul class="flex flex-wrap gap-4">
              <QuizLevelItem
                v-for="level in filteredLevels"
                :key="level.id"
                :name="level.name"
                :color="level.color"
                :bgColor="level.bg_color_normal"
              />
            </ul>
          </div>

          <div class="space-y-4">
            <h2 class="font-semibold">Categories</h2>
            <ul class="flex flex-wrap gap-4 sm:max-h-60 sm:overflow-y-auto sm:scrollbar-thin">
              <QuizCategoryItem
                v-for="category in filteredCategories"
                :key="category.id"
                :name="category.name"
                mode="filter"
              />
            </ul>
          </div>
        </div>

        <ul v-show="activeElement !== 'filter'" class="space-y-6 sm:hidden">
          <FilterSorting />
        </ul>
        <div v-if="showButtons" class="sm:hidden flex gap-2 mt-6">
          <button class="bg-blue-main text-white py-2.5 px-6 font-semibold basis-2/3 rounded-xl">
            Confirm
          </button>
          <button
            @click.stop="customReset"
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
        <FilterSorting />
      </ul>
    </div>
  </form>
</template>

<script>
import SearchIcon from '@/icons/SearchIcon.vue'
import CancelIcon from '@/icons/CancelIcon.vue'
import FilterIcon from '@/icons/FilterIcon.vue'
import FilterSorting from './FilterSorting.vue'
import QuizLevelItem from './QuizLevelItem.vue'
import QuizCategoryItem from './QuizCategoryItem.vue'
import { getDifficultyLevels } from '@/services/api/levels'
import FilterCheckbox from './FilterCheckbox.vue'

export default {
  emits: ['close'],
  props: ['isShowing', 'names'],
  components: {
    SearchIcon,
    CancelIcon,
    FilterIcon,
    FilterSorting,
    QuizLevelItem,
    QuizCategoryItem,
    FilterCheckbox
  },

  data() {
    return {
      search: '',
      activeElement: 'filter',
      levels: [],
      myQuizzesChecked: false,
      notCompletedChecked: false
    }
  },
  methods: {
    onSubmit() {
      const categories = this.$store.getters['filter/getCategoriesInFilter']
      const levels = this.$store.getters['filter/getLevelsInFilter']
      // Filter out duplicate values before building the query string
      const uniqueFiltersCategories = [...new Set([...categories])]
      const uniqueFiltersLevels = [...new Set([...levels])]

      this.$router.push({
        query: {
          ...this.$route.query,
          categories: uniqueFiltersCategories.join('&'),
          levels: uniqueFiltersLevels.join('&'),
          sort: this.getSortBy,
          my_quizzes: this.myQuizzesChecked,
          not_completed: this.notCompletedChecked
        }
      })
      this.$emit('close')
    },
    customReset() {
      const { categories, levels, sort, my_quizzes, not_completed } = this.$route.query

      this.search = ''
      this.activeElement = 'filter'
      this.$store.dispatch('filter/setAllCategories', categories ? categories.split('&') : [])
      this.$store.dispatch('filter/setAllLevels', levels ? levels.split('&') : [])
      this.$store.dispatch('filter/setSort', sort ?? '')
      this.myQuizzesChecked = my_quizzes
      this.notCompletedChecked = not_completed
    },
    handleClickOutside(e) {
      if (this.$refs.formRef && !this.$refs.formRef?.contains(e.target)) {
        this.$emit('close')
      }
    }
  },

  computed: {
    categories() {
      return this.$store.getters['categories/getAllCategories']
    },
    filteredCategories() {
      return this.categories.filter((item) =>
        item.name.toLowerCase().includes(this.search.toLowerCase())
      )
    },
    filteredLevels() {
      return this.levels.filter((level) =>
        level.name.toLowerCase().includes(this.search.toLowerCase())
      )
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
    getSortBy() {
      return this.$store.getters['filter/getSortBy']
    },
    showButtons() {
      const categoriesInFilter = this.$store.getters['filter/getCategoriesInFilter']
      const levelsInFilter = this.$store.getters['filter/getLevelsInFilter']

      const { categories, levels, sort, my_quizzes, not_completed } = this.$route.query
      const urlCategories = categories ? categories.split('&').sort() : []
      const urlLevels = levels ? levels.split('&').sort() : []
      const categoriesChanged =
        JSON.stringify(categoriesInFilter.toSorted()) !== JSON.stringify(urlCategories)
      const levelsChanged = JSON.stringify(levelsInFilter.toSorted()) !== JSON.stringify(urlLevels)
      const sortChanged = this.getSortBy !== (sort || '')
      const myQuizzesChanged = String(this.myQuizzesChecked) !== (my_quizzes ?? false)
      const notCompletedChanged = String(this.notCompletedChecked) !== (not_completed ?? false)

      return (
        categoriesChanged || levelsChanged || sortChanged || myQuizzesChanged || notCompletedChanged
      )
    }
  },

  async mounted() {
    const { my_quizzes, not_completed } = this.$route.query

    if (my_quizzes) this.myQuizzesChecked = my_quizzes
    if (not_completed) this.notCompletedChecked = not_completed
    document.addEventListener('click', this.handleClickOutside)

    try {
      const { data } = await getDifficultyLevels()
      this.levels = data
    } catch (err) {
      this.$store.dispatch('toast/setToast', {
        type: 'error',
        text: `Unexpected Error`,
        message: err.message,
        duration: 5000
      })
    }
  },
  unmounted() {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>
