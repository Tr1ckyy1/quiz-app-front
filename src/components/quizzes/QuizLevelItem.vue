<template>
  <li
    @click="triggerActive(title)"
    class="py-2.5 px-5 sm:py-1 sm:px-3 rounded-2xl sm:cursor-pointer"
    :class="activeColors"
  >
    {{ title }}
  </li>
</template>

<script>
export default {
  props: ['title'],
  methods: {
    triggerActive(title) {
      this.$store.dispatch('quizzes/triggerLevelFilter', title)
    }
  },
  computed: {
    activeColors() {
      const selected = this.$store.getters['quizzes/getLevelsInFilter'].find(
        (item) => item === this.title
      )
      return selected ? 'bg-[#175CD3] text-white' : 'bg-[#F0F9FF] text-[#026AA2]'
    }
  }
}
</script>
