<template>
  <div class="h-screen flex flex-col justify-between">
    <RouterView name="header" />
    <main class="flex-1">
      <RouterView />
    </main>
    <RouterView name="footer" />
  </div>
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
