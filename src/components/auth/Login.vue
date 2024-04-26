<template>
  <section class="flex gap-20 justify-center sm:justify-start">
    <ToastMessage :toast="toast" />
    <RouterLink class="absolute top-6 left-6 hidden sm:block" to="/">
      <QuizIcon />
    </RouterLink>
    <img src="@/assets/login-logo.png" class="hidden sm:block object-cover min-h-screen" />

    <div class="w-full max-w-[34rem] py-14">
      <button
        class="flex items-center px-6 sm:hover:underline sm:duration-100"
        @click="$router.go(-1)"
      >
        <GoBack />
        <p>Back</p>
      </button>
      <AuthModal
        title="Hi, Welcome!"
        description="Don't have an account?"
        descr-span="Sign up"
        mode="login"
      >
        <Form @submit="onSubmit" class="space-y-4" :validation-schema="schema" v-slot="{ errors }">
          <BaseInput
            name="email"
            title="Email address"
            placeholder="Your email"
            type="email"
            id="login-email"
            :error="errors.email"
          />

          <BaseInput
            name="password"
            title="Password"
            placeholder="Your password"
            type="password"
            id="login-password"
            :error="errors.password"
          />

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="relative flex items-center">
                <Field
                  :value="true"
                  type="checkbox"
                  name="remember_token"
                  id="remember_token"
                  class="appearance-none w-5 h-5 rounded-full border checked:bg-black"
                />
                <label for="remember_token">
                  <svg
                    class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                    width="14"
                    height="14"
                    viewBox="0 0 13 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 3.5L5 7L10.5 1.5" stroke="white" stroke-width="2" />
                  </svg>
                </label>
              </div>
              <label for="remember_token" class="text-sm">Remember for 30 days</label>
            </div>

            <RouterLink to="/auth/forgot">Forgot password?</RouterLink>
          </div>

          <BaseButton :disabled="loginLoading" mode="authButton">Log in</BaseButton>
          <BaseButton
            type="button"
            @click="resendVerification"
            v-if="resendButton.isShowing"
            mode="authButton"
            :disabled="resendButton.isLoading"
            >Resend verification</BaseButton
          >
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
import { verifyUser, resend, login } from '@/services/api/auth'

export default {
  components: { AuthModal, BaseInput, QuizIcon, Form, Field, GoBack },
  data() {
    const schema = {
      email: yup.string().required('Email is required').email('Must be a valid email address'),
      password: yup.string().required('Password is required')
    }
    return {
      schema,
      resendButton: {
        isShowing: false,
        isLoading: false
      },
      loginLoading: false
    }
  },

  methods: {
    async onSubmit(values, { resetForm, setFieldError }) {
      this.loginLoading = true
      try {
        await login(values)
        resetForm()
        this.$store.dispatch('auth/login')
        this.$router.replace('/quizzes')
      } catch (error) {
        console.log(error)
        if (!error.response?.data?.errors) {
          this.$store.dispatch('toast/setToast', {
            type: 'error',
            text: `Unexpected Error`,
            message: error.response?.data?.message ?? error.message,
            duration: 5000
          })
        } else {
          for (const fieldName in error.response.data.errors) {
            setFieldError(fieldName, error.response.data.errors[fieldName])
          }
        }
      } finally {
        this.loginLoading = false
      }
    },
    async resendVerification() {
      const { id, hash, expires } = this.$route.query
      if (id && hash && expires) {
        this.resendButton.isLoading = true
        try {
          const {
            data: { type, text, message, duration }
          } = await resend({ id, hash, expires })
          this.$store.dispatch('toast/setToast', {
            type,
            text,
            message,
            duration
          })
        } catch (err) {
          this.$store.dispatch('toast/setToast', {
            type: 'error',
            text: 'Error',
            message: err.response.data.message,
            duration: 5000
          })
        } finally {
          this.resendButton.isLoading = false
          this.resendButton.isShowing = false
        }
      }
    },
    async sendVerificationRequest() {
      const { id, hash, expires, signature } = this.$route.query
      if (id && hash && expires && signature) {
        try {
          const {
            data: { type, text, message, duration }
          } = await verifyUser({ id, hash, expires, signature })
          this.$store.dispatch('toast/setToast', {
            type: type,
            text: text,
            message: message,
            duration: duration
          })
        } catch (err) {
          this.$store.dispatch('toast/setToast', {
            type: 'error',
            text: 'Error',
            message: err.response.data.message,
            duration: 5000
          })
          if (err.response.data.message.includes('token')) {
            this.resendButton.isShowing = true
          }
        }
      }
    }
  },

  computed: {
    toast() {
      return this.$store.getters['toast/toastValues']
    }
  },
  mounted() {
    this.sendVerificationRequest()
  }
}
</script>
