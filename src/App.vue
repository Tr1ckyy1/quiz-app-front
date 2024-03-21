<template>
  <TheHeader v-if="!$route.path.includes('auth')" />
  <RouterView />
  <HomeFooter v-if="!$route.path.includes('auth')" />
</template>

<script>
import TheHeader from '@/components/ui/TheHeader.vue'
import HomeFooter from '@/components/ui/TheFooter.vue'
export default {
  components: { TheHeader, HomeFooter }
}
</script>
