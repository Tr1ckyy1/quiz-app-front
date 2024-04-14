<template>
  <section class="flex gap-20 justify-center sm:justify-start">
    <ToastMessage :toast="toast" />

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
        mode="forgot"
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

          <BaseButton :disabled="isLoading" mode="authButton">Send</BaseButton>
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

import { forgotPassword } from '@/services/api/auth'

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
    return { schema, isLoading: false }
  },

  methods: {
    async onSubmit(values, { resetForm, setFieldError }) {
      this.isLoading = true
      try {
        const {
          data: { type, text, message }
        } = await forgotPassword(values)
        resetForm()
        this.$store.dispatch('toast/setToast', {
          type,
          text,
          message,
          duration: 3000
        })
      } catch (error) {
        if (!error.response?.data?.errors?.email) {
          this.$store.dispatch('toast/setToast', {
            type: 'error',
            text: `Unexpected Error`,
            message: error.message,
            duration: 5000
          })
        } else {
          setFieldError('email', error?.response?.data?.errors?.email)
        }
      } finally {
        this.isLoading = false
      }
    }
  },
  computed: {
    toast() {
      return this.$store.getters['toast/toastValues']
    }
  }
}
</script>
