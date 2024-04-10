<template>
  <RouterView name="header" />
  <main>
    <RouterView />
  </main>
  <RouterView name="footer" />
</template>

<script>
export default {
  beforeMount() {
    if (localStorage.getItem('loggedIn')) {
      this.$store.dispatch('auth/login')
    }
  }
}
</script>
