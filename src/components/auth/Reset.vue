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
      <AuthModal title="Reset password" description="Already have an account?" descr-span="Log in">
        <Form @submit="onSubmit" class="space-y-4" :validation-schema="schema" v-slot="{ errors }">
          <BaseInput
            name="password"
            title="New password"
            placeholder="Must be 3 characters"
            type="password"
            id="reset-password"
            :error="errors.password"
          />
          <BaseInput
            name="password_confirmation"
            title="Confirm password"
            placeholder="Must be 3 characters"
            type="password"
            id="reset-confirm-password"
            :error="errors.password_confirmation"
          />
          <BaseButton :disabled="isLoading" mode="authButton">Reset password</BaseButton>
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
import { resetPassword } from '@/services/api/auth'

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
    const schema = yup.object().shape({
      password: yup
        .string()
        .trim()
        .required('Password is required')
        .min(3, 'Must be at least 3 characters'),
      password_confirmation: yup
        .string()
        .required('Confirm password is required')
        .oneOf([yup.ref('password')], 'Passwords do not match')
    })
    return { schema, isLoading: false }
  },

  methods: {
    async onSubmit(values, { setFieldError }) {
      this.isLoading = true
      const { token, email } = this.$route.query
      if (token && email) {
        try {
          const {
            data: { type, text, message }
          } = await resetPassword({ ...values, token, email })
          console.log(type)
          this.$store.dispatch('toast/setToast', {
            type,
            text,
            message,
            duration: 3000
          })
          this.$router.push('/auth/login')
        } catch (error) {
          console.log(error)
          if (!error.response?.data?.errors) {
            this.$store.dispatch('toast/setToast', {
              type: 'error',
              text: `Unexpected Error`,
              message: error.response?.data?.message ?? error.message,
              duration: 5000
            })
          } else if (error.response?.data?.errors?.email) {
            this.$store.dispatch('toast/setToast', {
              type: 'error',
              text: `Unexpected Error`,
              message: 'Invalid email address',
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
  },
  computed: {
    toast() {
      return this.$store.getters['toast/toastValues']
    }
  }
}
</script>
