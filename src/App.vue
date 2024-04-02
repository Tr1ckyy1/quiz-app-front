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
  }
}
</script>
