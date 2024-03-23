<template>
  <section class="flex gap-20 justify-center sm:justify-start">
    <img src="@/assets/login-logo.png" class="hidden sm:block h-screen object-cover" />

    <div class="w-full max-w-[34rem] pt-10">
      <button class="flex items-center px-6" @click="$router.go(-1)">
        <GoBack />
        <h1>Back</h1>
      </button>
      <LoginForm routeTo="/auth/signup" />
    </div>
  </section>
</template>

<script>
import LoginForm from '@/components/ui/auth/LoginForm.vue'

import GoBack from '@/icons/GoBack.vue'

export default {
  components: { LoginForm, GoBack }
}
</script>
