<template>
  <RouterView :isHomePage="isHomePage" name="header" />
  <main>
    <RouterView />
  </main>
  <RouterView name="footer" />
</template>

<script>
export default {
  computed: {
    isHomePage() {
      return this.$route.name === 'home'
    }
  },

  beforeMount() {
    if (localStorage.getItem('loggedIn')) {
      this.$store.dispatch('auth/login')
    }
  }
}
</script>
