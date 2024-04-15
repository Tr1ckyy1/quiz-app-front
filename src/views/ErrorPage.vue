<template>
  <div class="flex flex-col items-center gap-6 justify-center my-10">
    <h1 class="font-extrabold text-5xl font-raleway">{{ headerText }}</h1>
    <p class="font-bold text-xl">Error {{ status }}</p>
    <img src="@/assets/error-404.png" v-if="status === '404'" />
    <img src="@/assets/error-500.png" v-if="status === '500'" />
    <button @click="$router.replace('/')" class="flex gap-4 items-center text-blue-main">
      <ErrorGoBack />
      Go Home
    </button>
  </div>
</template>

<script>
import ErrorGoBack from '@/icons/ErrorGoBack.vue'
export default {
  props: ['status'],
  components: { ErrorGoBack },
  computed: {
    headerText() {
      if (this.status === '404') return 'Oops!'
      if (this.status === '500') return 'Internal server error!'
      return ''
    }
  },
  beforeMount() {
    if (this.status !== '404' && this.status !== '500') {
      this.$router.replace('/')
    }
  }
}
</script>
