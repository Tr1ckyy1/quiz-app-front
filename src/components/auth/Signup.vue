<template>
  <section class="flex gap-20 justify-center sm:justify-start">
    <img src="@/assets/create-logo.png" class="hidden sm:block object-cover h-screen" />

    <div class="w-full max-w-[34rem] pt-10">
      <button class="flex items-center px-6" @click="$router.go(-1)">
        <GoBack />
        <h1>Back</h1>
      </button>
      <SignupForm routeTo="/auth/login" />
    </div>
  </section>
</template>

<script>
import SignupForm from '@/components/ui/auth/SignupForm.vue'

import GoBack from '@/icons/GoBack.vue'

export default {
  components: { SignupForm, GoBack }
}
</script>
