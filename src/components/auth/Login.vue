<template>
  <section class="flex gap-20 justify-center sm:justify-start">
    <img src="@/assets/login-logo.png" class="hidden sm:block" />

    <ToastMessage :toast="toast" />

    <div class="w-full max-w-[34rem] py-14">
      <button class="flex items-center px-6" @click="$router.go(-1)">
        <GoBack />
        <h1>Back</h1>
      </button>
      <AuthModal title="Hi, Welcome!" description="Don't have an account?" descr-span="Sign up">
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
                  name="remember-check"
                  id="remember-check"
                  class="appearance-none w-5 h-5 rounded-full border checked:bg-black"
                />
                <label for="remember-check">
                  <svg
                    class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                    width="16"
                    height="16"
                    viewBox="0 0 13 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 3.5L5 7L10.5 1.5" stroke="white" stroke-width="2" />
                  </svg>
                </label>
              </div>
              <label for="remember-check" class="text-sm">Remember for 30 days</label>
            </div>

            <RouterLink to="/auth/forgot">Forgot password?</RouterLink>
          </div>

          <BaseButton mode="authButton">Log in</BaseButton>
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
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import GoBack from '@/icons/GoBack.vue'
import { verifyUser, resend } from '@/services/api/auth'

export default {
  components: { AuthModal, BaseInput, Form, Field, GoBack },
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
      }
    }
  },

  methods: {
    onSubmit(values) {
      console.log(values)
    },
    async resendVerification() {
      const { id, expires } = this.$route.query
      if (id && expires) {
        try {
          this.resendButton.isLoading = true
          const data = await resend({ id, expires })
          this.$store.dispatch('toast/setToast', {
            type: data.type,
            text: data.text,
            message: data.message,
            duration: data.duration
          })

          this.resendButton.isShowing = false
        } catch (err) {
          this.resendButton.isLoading = true

          this.$store.dispatch('toast/setToast', {
            type: 'error',
            text: 'Error',
            message: err.message,
            duration: 5000
          })

          this.resendButton.isShowing = false
        }
        this.resendButton.isLoading = false
      }
    },
    async sendVerificationRequest() {
      const { id, hash, expires, signature } = this.$route.query
      if (id && hash && expires && signature) {
        try {
          const data = await verifyUser({ id, hash, expires, signature })
          this.$store.dispatch('toast/setToast', {
            type: data.type,
            text: data.text,
            message: data.message,
            duration: data.duration
          })
        } catch (err) {
          this.$store.dispatch('toast/setToast', {
            type: 'error',
            text: 'Error',
            message: err.message,
            duration: 5000
          })
          if (err.message.includes('token')) {
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
