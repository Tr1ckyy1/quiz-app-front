<template>
  <section class="px-4 sm:px-24">
    <div>
      <button @click="scrollLeft">Left scroll</button>

      <ul class="flex gap-6 overflow-x-scroll border-b py-5 scrollbar-none" ref="scrollContainer">
        <li class="whitespace-nowrap" v-for="(name, index) in names" :key="index">
          {{ name }}
        </li>
      </ul>
      <buton @click="scrollRight">Right scroll</buton>
    </div>
  </section>
</template>

<script>
// import ScrollLeft from ''
export default {
  data() {
    return {
      names: [
        'All Quizzes',
        'Geography',
        'Music',
        'Movies',
        'Television',
        'Just for fun',
        'Personality',
        'History',
        'Language',
        'Literature',
        'Philosophy',
        'Math',
        'sald',
        'sdalld',
        'lsa;lad;la',
        'lsa;dalsd;lq',
        'las;d;lsadlalka',
        'salaklqlk',
        'alsdlaslkalksa',
        'asdoaskdsaklda',
        '12lk31kl',
        'd19219191dk',
        'dalalkdsasalklkdsalkdsa',
        'alksdaslkdasdlksalkdsalkskdallksalkd',
        'dsaldsalkdsalkdsalkdsalkdsa',
        'askldalksalkdslksalkdalklkslkdsalkdsalk'
      ]
    }
  },
  methods: {
    // change magic numbers
    scrollLeft() {
      this.$refs.scrollContainer.scrollLeft -= 100
    },
    scrollRight() {
      this.$refs.scrollContainer.scrollRight += 100
    }
  }
}
</script>
