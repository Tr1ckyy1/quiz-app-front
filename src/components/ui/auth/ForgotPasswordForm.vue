<template>
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
</template>

<script>
import AuthModal from './AuthModal.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'

export default {
  data() {
    const schema = {
      email: yup.string().required('Email is required').email('Must be a valid email address')
    }
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
