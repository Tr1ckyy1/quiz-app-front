<template>
  <section class="flex gap-20 justify-center sm:justify-start">
    <ToastMessage :toast="toast" />
    <RouterLink class="absolute top-6 left-6 hidden sm:block" to="/">
      <QuizIcon />
    </RouterLink>
    <img src="@/assets/create-logo.png" class="hidden sm:block object-cover min-h-screen" />
    <div class="w-full max-w-[34rem] py-14">
      <button class="flex items-center px-6 hover:underline duration-100" @click="$router.go(-1)">
        <GoBack />
        <p>Back</p>
      </button>
      <AuthModal title="Create account" description="Already have an account?" descr-span="Log in">
        <Form @submit="onSubmit" class="space-y-4" :validation-schema="schema" v-slot="{ errors }">
          <BaseInput
            name="username"
            title="Username"
            placeholder="Your username"
            type="text"
            id="signup-username"
            :error="errors.username"
          />
          <BaseInput
            name="email"
            title="Email"
            placeholder="Example@gmail.com"
            type="email"
            id="signup-email"
            :error="errors.email"
          />
          <BaseInput
            name="password"
            title="Create a password"
            placeholder="Must be 3 characters"
            type="password"
            id="signup-password"
            :error="errors.password"
          />
          <BaseInput
            name="password_confirmation"
            title="Confirm password"
            placeholder="Must be 3 characters"
            type="password"
            id="signup-confirm-password"
            :error="errors.password_confirmation"
          />

          <div class="h-14">
            <div class="flex gap-3 items-center">
              <div class="relative flex items-center">
                <Field
                  :value="true"
                  type="checkbox"
                  name="accept_terms"
                  id="accept_terms"
                  class="appearance-none w-5 h-5 rounded-full border checked:bg-black"
                />
                <label for="accept_terms">
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

              <label for="accept_terms" class="text-sm"
                >I accept the terms and privacy policy</label
              >
            </div>
            <ErrorMessage name="accept_terms" class="block text-red-main mt-2" />
          </div>

          <BaseButton mode="authButton" :disabled="isLoading">Sign up</BaseButton>
        </Form>
      </AuthModal>
    </div>
  </section>
</template>

<script>
import AuthModal from '@/components/ui/AuthModal.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import QuizIcon from '@/icons/QuizIcon.vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import GoBack from '@/icons/GoBack.vue'
import { signup } from '@/services/api/auth.js'

export default {
  components: {
    AuthModal,
    BaseInput,
    QuizIcon,
    Form,
    Field,
    ErrorMessage,
    GoBack
  },
  data() {
    const schema = yup.object().shape({
      // username: yup
      //   .string()
      //   .trim()
      //   .required('Username is required')
      //   .min(3, 'Must be at least 3 characters'),
      // email: yup.string().required('Email is required').email('Must be a valid email address'),
      // password: yup
      //   .string()
      //   .trim()
      //   .required('Password is required')
      //   .min(3, 'Must be at least 3 characters'),
      // password_confirmation: yup
      //   .string()
      //   .required('Confirm password is required')
      //   .oneOf([yup.ref('password')], 'Passwords do not match'),
      // accept_terms: yup.boolean().required('The accept terms field must be accepted')
    })

    return {
      schema,
      isLoading: false
    }
  },
  computed: {
    toast() {
      return this.$store.getters['toast/toastValues']
    }
  },
  methods: {
    async onSubmit(values, { resetForm, setFieldError }) {
      this.isLoading = true
      try {
        const {
          data: { type, text, message }
        } = await signup(values)
        resetForm()
        this.$store.dispatch('toast/setToast', {
          type: type,
          text: text,
          message: message,
          duration: 3000
        })
      } catch (error) {
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
        this.isLoading = false
      }
    }
  }
}
</script>
