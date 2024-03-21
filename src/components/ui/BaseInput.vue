<template>
  <div class="flex flex-col gap-2">
    <label :for="id">{{ title }}</label>
    <Field
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :name="name"
      class="border p-4 outline-none rounded-xl"
    />
  </div>
</template>

<script>
import { Field } from 'vee-validate'
export default {
  components: { Field },
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
    }
  },
  
}
</script>
