<template>
  <section class="flex gap-20 justify-center sm:justify-start">
    <img src="@/assets/forgot-logo.png" class="hidden sm:block" />

    <div class="w-full max-w-[34rem] py-14">
      <button class="flex items-center px-6" @click="$router.go(-1)">
        <GoBack />
        <h1>Back</h1>
      </button>
      <ForgotPasswordForm />
    </div>
  </section>
</template>

<script>
import ForgotPasswordForm from '@/components/ui/auth/ForgotPasswordForm.vue'

import GoBack from '@/icons/GoBack.vue'

export default {
  components: { ForgotPasswordForm, GoBack }
}
</script>
