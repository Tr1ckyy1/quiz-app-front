<template>
  <RouterView />
</template>

<script>
import { getCsrfCookie } from '@/plugins/axios'
export default {
  mounted() {
    getCsrfCookie()
  }
}
</script>
