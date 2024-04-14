<template>
  <li
    @click="setSortBy"
    class="flex items-center gap-4 py-2 px-3 rounded-lg cursor-pointer"
    :class="activeSort"
  >
    <slot></slot><span class="group text-[#475467]">{{ name }}</span>
    <CheckmarkIcon v-if="getSortBy === name" class="ml-auto" />
  </li>
</template>

<script>
import CheckmarkIcon from '@/icons/CheckmarkIcon.vue'
export default {
  props: ['name'],
  components: { CheckmarkIcon },
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
        ? 'bg-[#D9D9D933] font-extrabold'
        : 'sm:hover:bg-[#D9D9D933] font-semibold'
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
