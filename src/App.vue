<template>
  <RouterView :isHomePage="isHomePage" name="header" />
  <main>
    <RouterView />
  </main>
  <RouterView name="footer" />
</template>

<script>
import { getCsrfCookie } from '@/plugins/axios'
export default {
  computed: {
    isHomePage() {
      return this.$route.name === 'home'
    }
  },
  mounted() {
    getCsrfCookie()
  },
  beforeMount() {
    if (localStorage.getItem('loggedIn')) this.$store.dispatch('auth/login')
  }
}
</script>
