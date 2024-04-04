<template>
  <li
    @click="filterCategories(id, name)"
    class="whitespace-nowrap cursor-pointer"
    :class="isCategorySelected"
  >
    {{ name }}
  </li>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
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
    if (this.mode === 'filter' && this.$route.query[`id${this.id}`] === this.name) {
      this.$store.dispatch('quizzes/addOnce', this.name)
    }
  },
  methods: {
    filterCategories(id, name) {
      this.$store.dispatch('quizzes/addInActiveCategories', name)
      if (this.mode !== 'filter') {
        if (this.$route.query[`id${id}`] === name) {
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
      }
    }
  },
  computed: {
    isCategorySelected() {
      if (this.mode === 'filter') {
        const checkIfCategoryExistsAsQuery = this.$store.getters[
          'quizzes/getCategoriesInFilter'
        ].find((item) => item === this.name)
        return checkIfCategoryExistsAsQuery
          ? 'bg-black text-white py-2 px-4 rounded-3xl font-semibold'
          : 'py-2 px-4 rounded-3xl text-[#475467] font-semibold'
      } else
        return this.$route.query[`id${this.id}`] === this.name
          ? 'border-b-black border-b font-bold py-4'
          : 'py-4'
    }
  }
}
</script>
