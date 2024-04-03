<template>
  <section class="px-4 sm:px-24">
    <div class="flex gap-6 drop-shadow-2xl items-center">
      <button
        class="duration-300 hover:bg-black/10 rounded-full w-8 h-8 flex items-center justify-center ease-linear"
        v-show="showLeftArrow"
        @click="scrollLeft"
      >
        <ScrollLeft />
      </button>
      <ul class="border-b flex gap-6 overflow-x-hidden scroll-smooth" ref="scrollContainer">
        <li
          @click="filterCategories(item.id, item.name)"
          class="whitespace-nowrap py-4 cursor-pointer"
          v-for="item in names"
          :key="item.id"
          :class="{ 'border-b-black border-b font-bold': isCategorySelected(item.id) }"
        >
          {{ item.name }}
        </li>
      </ul>
      <button
        class="duration-300 hover:bg-black/10 rounded-full w-8 h-8 flex items-center justify-center ease-linear"
        v-show="showRightArrow"
        @click="scrollRight"
      >
        <ScrollRight />
      </button>
    </div>
  </section>
</template>

<script>
import ScrollLeft from '@/icons/ScrollLeft.vue'
import ScrollRight from '@/icons/ScrollRight.vue'
export default {
  components: { ScrollLeft, ScrollRight },
  data() {
    return {
      test: null,
      showLeftArrow: false,
      showRightArrow: true,
      names: [
        { id: 1, name: 'All Quizzes' },
        { id: 2, name: 'Geography' },
        { id: 3, name: 'Music' },
        { id: 4, name: 'Movies' },
        { id: 5, name: 'Television' },
        { id: 6, name: 'Just for fun' },
        { id: 7, name: 'Personality' },
        { id: 8, name: 'History' },
        { id: 9, name: 'Language' },
        { id: 10, name: 'Literature' },
        { id: 11, name: 'Philosophy' },
        { id: 12, name: 'Math' }
      ]
    }
  },
  methods: {
    filterCategories(id, name) {
      if (this.$route.query[`id${id}`]) {
        const storedQueries = { ...this.$route.query }
        delete storedQueries[`id${id}`]
        this.$router.replace({ query: storedQueries })
      } else {
        this.$router.push({
          query: {
            ...this.$route.query,
            [`id${id}`]: name
          }
        })
      }
    },

    scrollLeft() {
      const scrollContainer = this.$refs.scrollContainer

      scrollContainer.scrollLeft -= 100

      this.showRightArrow = true
      this.showLeftArrow = scrollContainer.scrollLeft > 0

      if (!this.showLeftArrow) {
        this.showLeftArrow = false
      }
    },
    scrollRight() {
      const scrollContainer = this.$refs.scrollContainer

      scrollContainer.scrollLeft += 100

      this.showLeftArrow = true
      this.showRightArrow =
        scrollContainer.scrollLeft < scrollContainer.scrollWidth - scrollContainer.clientWidth

      if (!this.showRightArrow) {
        this.showRightArrow = false
      }
    }
  },
  computed: {
    isCategorySelected() {
      return (categoryId) => {
        return this.$route.query[`id${categoryId}`] !== undefined
      }
    }
  }
}
</script>
