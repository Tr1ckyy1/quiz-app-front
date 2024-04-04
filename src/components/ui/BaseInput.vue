<template>
  <div class="flex flex-col gap-2 relative h-[122px]">
    <label :for="id">{{ title }}</label>
    <Field
      :id="id"
      :type="inputType"
      :placeholder="placeholder"
      :name="name"
      class="border p-4 outline-none rounded-xl"
      :class="{ 'border-red-main': error, 'focus:border-blue-main': !error }"
      :validateOnInput="true"
      :validateOnBlur="false"
    />
    <ErrorMessage class="text-red-500" :name="name" />
    <ErrorIcon class="absolute right-4 top-1/2 -translate-y-1/2" v-if="error" />
    <ShowIcon
      @click="passwordIsVisible = true"
      class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
      v-if="type === 'password' && !error"
    />
    <HideIcon
      @click="passwordIsVisible = false"
      class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
      v-if="passwordIsVisible && !error"
    />
  </div>
</template>

<script>
import ErrorIcon from '@/icons/ErrorIcon.vue'
import ShowIcon from '@/icons/ShowIcon.vue'
import HideIcon from '@/icons/HideIcon.vue'
import { Field, ErrorMessage } from 'vee-validate'

export default {
  data() {
    return {
      passwordIsVisible: false
    }
  },
  computed: {
    inputType() {
      if (this.type === 'password') return this.passwordIsVisible ? 'text' : 'password'
      return this.type
    }
  },

  components: { Field, ErrorMessage, ErrorIcon, ShowIcon, HideIcon },
  props: {
    title: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    name: {
      type: String,
      required: false,
      default: ''
    },
    id: {
      type: String,
      required: true
    },
    error: {
      type: String,
      required: false
    }
  }
}
</script>
