<template>
  <AuthModal
    :route="routeTo"
    title="Create account"
    description="Already have an account?"
    descr-span="Log in"
  >
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
        placeholder="must be 8 characters"
        type="password"
        id="signup-password"
        :error="errors.password"
      />
      <BaseInput
        name="confirmPassword"
        title="Confirm password"
        placeholder="must be 8 characters"
        type="password"
        id="signup-confirm-password"
        :error="errors.confirmPassword"
      />

      <div class="flex gap-3 items-center">
        <div class="relative flex items-center">
          <Field
            :value="true"
            type="checkbox"
            name="accept-terms"
            id="accept-terms"
            class="appearance-none w-5 h-5 rounded-full border checked:bg-black"
          />
          <label for="accept-terms">
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

        <label for="accept-terms" class="text-sm">I accept the terms and privacy policy</label>
      </div>

      <BaseButton mode="authButton">Sign up</BaseButton>
    </Form>
  </AuthModal>
</template>

<script>
import AuthModal from './AuthModal.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'

export default {
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .trim()
        .required('Username is required')
        .min(3, 'Must be at least 3 characters'),
      email: yup.string().required('Email is required').email('Must be a valid email address'),
      password: yup
        .string()
        .trim()
        .required('Password is required')
        .min(3, 'Must be at least 3 characters'),

      confirmPassword: yup
        .string()
        .required('Confirm password')
        .oneOf([yup.ref('password')], 'Passwords do not match')
    })

    return { schema }
  },
  props: {
    routeTo: {
      type: String,
      required: false
    }
  },
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
