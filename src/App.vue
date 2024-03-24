<template>
  <RouterView :isHomePage="isHomePage" name="header" />
  <RouterView />
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
