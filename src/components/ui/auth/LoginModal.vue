<template>
  <AuthModal title="Hi, Welcome!" description="Don't have an account?" descr-span="Sign up">
    <Form @submit="onSubmit" class="space-y-6">
      <BaseInput
        name="email"
        title="Email address"
        placeholder="Your email"
        type="email"
        id="login-email"
      />

      <BaseInput
        name="password"
        title="Create a password"
        placeholder="must be 8 characters"
        type="password"
        id="login-password"
      />
      <BaseInput
        name="confirmPassword"
        title="Confirm password"
        placeholder="must be 8 characters"
        type="password"
        id="login-confirm-password"
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
        <RouterLink to="/">
          <p class="text-sm">Forgot password?</p>
        </RouterLink>
      </div>

      <BaseButton mode="authButton">Log in</BaseButton>
    </Form>
  </AuthModal>
</template>

<script>
import AuthModal from './AuthModal.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import { Form, Field } from 'vee-validate'

export default {
  components: {
    AuthModal,
    BaseInput,
    Form,
    Field
  },

  methods: {
    onSubmit(values) {
      console.log(values)
    }
  }
}
</script>
