<template>
  <section class="px-4 sm:px-24 py-4">
    <div class="sm:flex gap-6 items-center">
      <button
        class="hidden sm:duration-300 sm:hover:bg-black/10 sm:rounded-full sm:w-8 sm:h-8 sm:flex sm:items-center sm:justify-center sm:ease-linear sm:shrink-0"
        v-show="showLeftArrow"
        @click="scrollLeft"
      >
        <ScrollLeft />
      </button>
      <ul
        class="border-b flex gap-6 sm:overflow-x-hidden scroll-smooth overflow-x-scroll scrollbar-none"
        ref="scrollContainer"
      >
        <li
          :class="isQueryUrlEmpty"
          class="whitespace-nowrap py-4 cursor-pointer"
          @click="removeAllQueriesFromUrl"
        >
          All Quizzes
        </li>
        <QuizCategoryItem
          v-for="category in categories"
          :key="category.id"
          :id="category.id"
          :name="category.name"
        />
      </ul>
      <button
        class="hidden sm:duration-300 sm:hover:bg-black/10 sm:rounded-full sm:w-8 sm:h-8 sm:flex sm:items-center sm:justify-center sm:ease-linear sm:shrink-0"
        v-show="showRightArrow"
        @click="scrollRight"
      >
        <ScrollRight />
      </button>
      <div class="sm:ml-auto relative">
        <div
          @click.stop="toggleFilter"
          class="relative w-fit my-4 sm:my-0 flex items-center gap-4 border border-[#66708599] p-2.5 rounded-xl outline-none shrink-0 group sm:hover:border-blue-main transition-colors sm:duration-150 sm:hover:bg-blue-main/10 sm:cursor-pointer"
          :class="{ 'border-2 border-black': filteredItemsTotal > 0 }"
        >
          <div
            v-if="filteredItemsTotal > 0"
            class="absolute w-6 h-6 bg-white left-full -translate-x-1/2 top-0 -translate-y-1/2 flex items-center justify-center"
          >
            <div
              class="h-5 w-5 rounded-full bg-black flex items-center justify-center text-white text-xs font-bold shrink-0"
            >
              {{ filteredItemsTotal }}
            </div>
          </div>

          <FilterIcon class="sm:group-hover:fill-blue-main sm:duration-150" />
          <p
            class="sm:group-hover:text-blue-main sm:duration-150"
            :class="{ 'font-semibold': filteredItemsTotal > 0 }"
          >
            Filter
          </p>
        </div>
        <Transition
          enter-active-class="duration-300"
          leave-active-class="duration-300"
          enter-from-class="sm:opacity-0 sm:translate-x-0 -translate-x-full"
          leave-to-class="sm:opacity-0 sm:translate-x-0 -translate-x-full"
        >
          <QuizFilterModal
            :categories="categories"
            @close="closeFilter"
            :isShowing="filterModalShowing"
            v-if="filterModalShowing"
          />
        </Transition>
      </div>
    </div>
  </section>
</template>

<script>
import QuizCategoryItem from './QuizCategoryItem.vue'
import QuizFilterModal from './QuizFilterModal.vue'
import ScrollLeft from '@/icons/ScrollLeft.vue'
import ScrollRight from '@/icons/ScrollRight.vue'
import FilterIcon from '@/icons/FilterIcon.vue'

export default {
  components: { QuizCategoryItem, QuizFilterModal, ScrollLeft, ScrollRight, FilterIcon },
  data() {
    return {
      showLeftArrow: false,
      showRightArrow: true,
      filterModalShowing: false
    }
  },
  methods: {
    removeAllQueriesFromUrl() {
      this.$router.replace({ query: {} })
      this.$store.dispatch('filter/setAllCategories', [])
      this.$store.dispatch('filter/setAllLevels', [])
      this.$store.dispatch('filter/setSort', '')
    },
    toggleFilter() {
      this.filterModalShowing = !this.filterModalShowing
    },
    closeFilter() {
      this.filterModalShowing = false
    },
    scrollLeft() {
      const scrollContainer = this.$refs.scrollContainer

      scrollContainer.scrollLeft -= 200

      this.showRightArrow = true
      this.showLeftArrow = scrollContainer.scrollLeft > 0

      if (!this.showLeftArrow) {
        this.showLeftArrow = false
      }
    },
    scrollRight() {
      const scrollContainer = this.$refs.scrollContainer
      if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
        scrollContainer.scrollLeft += 200

        this.showLeftArrow = true
        this.showRightArrow =
          scrollContainer.scrollLeft < scrollContainer.scrollWidth - scrollContainer.clientWidth

        if (!this.showRightArrow) {
          this.showRightArrow = false
        }
      }
    }
  },
  computed: {
    isQueryUrlEmpty() {
      const { categories, levels, sort, search, my_quizzes, not_completed } = this.$route.query

      if (
        !categories &&
        !levels &&
        !sort &&
        !search &&
        !(my_quizzes && my_quizzes === 'true') &&
        !(not_completed && not_completed === 'true')
      )
        return 'border-b-black border-b font-bold'
      return ''
    },
    categories() {
      return this.$store.getters['categories/getAllCategories']
    },
    filteredItemsTotal() {
      const loggedIn = this.$store.getters['auth/isAuthenticated']
      const { categories, levels, sort, my_quizzes, not_completed } = this.$route.query
      const arrayTotal = []
      if (categories) arrayTotal.push(...categories.split('&'))
      if (levels) arrayTotal.push(...levels.split('&'))
      if (sort) arrayTotal.push(sort)
      if (loggedIn && my_quizzes && my_quizzes === 'true') arrayTotal.push(my_quizzes)
      if (loggedIn && not_completed && not_completed === 'true') arrayTotal.push(not_completed)
      return arrayTotal.length
    }
  }
}
</script>
