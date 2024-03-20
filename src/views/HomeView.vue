<template>
  <HomeHeader />
  <HomeMain />
  <HomeFooter />
</template>

<script>
import HomeHeader from '../components/homepage/HomeHeader.vue'
import HomeMain from '../components/homepage/HomeMain.vue'
import HomeFooter from '../components/homepage/HomeFooter.vue'

export default {
  components: { HomeHeader, HomeMain, HomeFooter }
}
</script>
