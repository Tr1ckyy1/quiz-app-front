<template>
  <section class="py-14 px-6 space-y-10 bg-white">
    <div class="text-center space-y-6 sm:text-left">
      <h1 class="font-extrabold text-2xl font-raleway sm:text-4xl">{{ title }}</h1>

      <p :class="{ hidden: !title.includes('Reset') }">Please type something you'll remember</p>
      <p
        class="block"
        :class="{
          'sm:hidden': !title.includes('Forgot'),
          hidden: title.includes('Reset')
        }"
      >
        {{ description }}
        <RouterLink :to="goTo" class="text-blue-main font-bold">
          {{ descrSpan }}
        </RouterLink>
      </p>
    </div>
    <slot></slot>
    <p v-if="!title.includes('Forgot')" class="hidden sm:block">
      {{ description }}
      <RouterLink :to="goTo" class="text-blue-main font-bold">
        {{ descrSpan }}
      </RouterLink>
    </p>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    descrSpan: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    goTo() {
      return this.descrSpan.replaceAll(' ', '').toLowerCase() === 'signup'
        ? '/auth/signup'
        : '/auth/login'
    }
  }
}
</script>
