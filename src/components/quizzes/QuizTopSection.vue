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
        <QuizCategoryItem v-for="item in names" :key="item.id" :id="item.id" :name="item.name" />
      </ul>
      <button
        class="hidden sm:duration-300 sm:hover:bg-black/10 sm:rounded-full sm:w-8 sm:h-8 sm:flex sm:items-center sm:justify-center sm:ease-linear sm:shrink-0"
        v-show="showRightArrow"
        @click="scrollRight"
      >
        <ScrollRight />
      </button>
      <div class="relative">
        <div
          @click="toggleFilter"
          class="w-fit my-4 sm:my-0 flex items-center gap-4 border border-[#66708599] p-2.5 rounded-xl outline-none shrink-0 group sm:hover:border-blue-main sm:duration-300 sm:hover:bg-blue-main/10 sm:cursor-pointer"
        >
          <FilterIcon class="sm:group-hover:fill-blue-main sm:duration-300" />
          <p class="sm:group-hover:text-blue-main sm:duration-300">Filter</p>
        </div>
        <Transition
          enter-active-class="duration-300"
          leave-active-class="duration-300"
          enter-from-class="sm:opacity-0 sm:translate-x-0 -translate-x-full"
          leave-to-class="sm:opacity-0 sm:translate-x-0 -translate-x-full"
        >
          <QuizFilterModal
            :names="names"
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
  props: ['names'],
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
      this.$store.dispatch('quizzes/removeAllCategories')
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

      scrollContainer.scrollLeft += 200

      this.showLeftArrow = true
      this.showRightArrow =
        scrollContainer.scrollLeft < scrollContainer.scrollWidth - scrollContainer.clientWidth

      if (!this.showRightArrow) {
        this.showRightArrow = false
      }
    }
  },
  computed: {
    isQueryUrlEmpty() {
      const hasNoQueries = Object.keys(this.$route.query).length === 0
      return hasNoQueries && 'border-b-black border-b font-bold'
    }
  }
}
</script>
