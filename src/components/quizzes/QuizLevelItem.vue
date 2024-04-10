<template>
  <li
    @click="triggerActive(name)"
    class="py-2.5 px-5 sm:py-1 sm:px-3 rounded-2xl sm:cursor-pointer"
    :class="activeColors"
    :style="activeColors"
  >
    {{ name }}
  </li>
</template>

<script>
export default {
  props: ['name', 'color', 'bgColor'],
  methods: {
    triggerActive(name) {
      this.$store.dispatch('filter/triggerCategoriesOrLevels', {
        name,
        mode: 'levels'
      })
    }
  },
  computed: {
    activeColors() {
      const selected = this.$store.getters['filter/getLevelsInFilter'].find(
        (item) => item === this.name
      )

      return selected
        ? { backgroundColor: this.color, color: 'white' }
        : { backgroundColor: this.bgColor, color: this.color }
    }
  },
  mounted() {
    if (this.$route.query.levels?.split('&').includes(this.name)) {
      this.$store.dispatch('filter/addLevelsOnce', { name: this.name })
    } else {
      this.$store.dispatch('filter/removeFromActiveLevels', this.name)
    }
  }
}
</script>
