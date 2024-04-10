<template>
  <li
    @click="filterCategories(name)"
    class="whitespace-nowrap cursor-pointer"
    :class="isCategorySelected"
  >
    {{ name }}
  </li>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      required: false
    }
  },
  mounted() {
    if (this.mode === 'filter') {
      if (this.$route.query.categories?.split('&').includes(this.name)) {
        this.$store.dispatch('filter/addCategoriesOnce', { name: this.name })
      } else {
        this.$store.dispatch('filter/removeFromActiveCategories', this.name)
      }
    }
  },

  methods: {
    filterCategories(name) {
      this.$store.dispatch('filter/triggerCategoriesOrLevels', { name, mode: 'categories' })
      if (this.mode !== 'filter') {
        const categories = this.$route.query.categories
        let selectedCategories = categories ? categories.split('&') : []
        const index = selectedCategories.indexOf(name)
        if (index !== -1) {
          selectedCategories.splice(index, 1)
        } else {
          selectedCategories.push(name)
        }
        this.$router.push({
          query: {
            ...this.$route.query,
            categories: selectedCategories.join('&')
          }
        })
      }
    }
  },
  computed: {
    isCategorySelected() {
      if (this.mode === 'filter') {
        const checkIfCategoryExistsAsQuery = this.$store.getters[
          'filter/getCategoriesInFilter'
        ].find((item) => item === this.name)
        return checkIfCategoryExistsAsQuery
          ? 'bg-black text-white py-2 px-4 rounded-3xl font-semibold'
          : 'py-2 px-4 rounded-3xl text-[#475467] font-semibold'
      } else {
        const { categories } = this.$route.query
        if (categories) {
          return categories?.split('&').includes(this.name)
            ? 'border-b-black border-b font-bold py-4'
            : 'py-4'
        }
        return 'py-4'
      }
    }
  }
}
</script>
