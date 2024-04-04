<template>
  <section class="flex gap-20 justify-center sm:justify-start">
    <RouterLink class="absolute top-6 left-6 hidden sm:block" to="/">
      <QuizIcon />
    </RouterLink>
    <img src="@/assets/forgot-logo.png" class="hidden sm:block object-cover min-h-screen" />

    <div class="w-full max-w-[34rem] py-14">
      <button
        class="flex items-center px-6 sm:hover:underline sm:duration-100"
        @click="$router.go(-1)"
      >
        <GoBack />
        <p>Back</p>
      </button>
      <AuthModal
        title="Forgot password?"
        description="Don't worry! It happens. Please enter the email associated with your account."
      >
        <Form @submit="onSubmit" class="space-y-4" :validation-schema="schema" v-slot="{ errors }">
          <BaseInput
            name="email"
            title="Email address"
            placeholder="Enter your email address"
            type="email"
            id="forgot-email"
            :error="errors.email"
          />

          <BaseButton mode="authButton">Send</BaseButton>
        </Form>
      </AuthModal>
    </div>
  </section>
</template>

<script>
import AuthModal from '@/components/ui/AuthModal.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import QuizIcon from '@/icons/QuizIcon.vue'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import GoBack from '@/icons/GoBack.vue'

export default {
  components: {
    AuthModal,
    BaseInput,
    QuizIcon,
    Form,
    Field,
    GoBack
  },
  data() {
    const schema = {
      email: yup.string().required('Email is required').email('Must be a valid email address')
    }
    return { schema }
  },

  methods: {
    onSubmit(values) {
      console.log(values)
    }
  }
}
</script>
