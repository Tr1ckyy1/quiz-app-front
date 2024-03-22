<template>
  <button v-if="!link" :class="customized">
    <slot></slot>
  </button>
  <RouterLink v-else :to="to" class="font-raleway font-bold" :class="customized">
    <slot></slot>
    <ArrowRight
      v-if="mode === 'login'"
      class="group-hover:opacity-100 opacity-0 duration-1000 fill-blue-main"
    />
  </RouterLink>
</template>

<script>
import ArrowRight from '@/icons/ArrowRight.vue'
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null
    },
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: '/'
    }
  },
  components: { ArrowRight },
  computed: {
    customized() {
      if (this.mode === 'signup')
        return 'rounded-md px-10 py-3.5 bg-black border border-black duration-500 text-white hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[6px_5px_2px_0_black] hover:bg-white hover:text-black'

      if (this.mode === 'login')
        return 'text-blue-main flex gap-2 items-center peer duration-300 group'

      if (this.mode === 'authButton')
        return 'block text-center bg-black w-full border-black border text-white py-4 rounded-xl font-bold hover:bg-white hover:text-black duration-300'

      return ''
    }
  }
}
</script>
