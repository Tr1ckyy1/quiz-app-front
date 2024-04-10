<template>
  <li class="flex items-center gap-4 pl-2">
    <slot></slot
    ><span @click="setSortBy" class="cursor-pointer group text-[#475467]" :class="activeSort">{{
      name
    }}</span>
  </li>
</template>

<script>
export default {
  props: ['name'],
  methods: {
    setSortBy() {
      this.$store.dispatch('filter/setSort', this.getSortBy === this.name ? '' : this.name)
    }
  },
  computed: {
    getSortBy() {
      return this.$store.getters['filter/getSortBy']
    },
    activeSort() {
      return this.getSortBy === this.name
        ? 'underline font-extrabold'
        : 'sm:hover:underline font-semibold'
    }
  },
  mounted() {
    if (this.$route.query.sort && this.$route.query.sort === this.name) {
      this.$store.dispatch('filter/setSort', this.name)
    }
  },
  unmounted() {
    this.$store.dispatch('filter/setSort', '')
  }
}
</script>
