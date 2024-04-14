<template>
  <section class="py-14 px-6 space-y-10 bg-white">
    <div class="text-center space-y-6 sm:text-left">
      <div class="flex justify-center sm:justify-start items-center gap-2">
        <h1 class="font-extrabold text-2xl font-raleway sm:text-4xl">{{ title }}</h1>
        <img src="@/assets/welcome-wave.png" class="object-cover" />
      </div>

      <p :class="{ hidden: mode !== 'reset' }">Please type something you'll remember</p>
      <p
        class="block"
        :class="{
          'sm:hidden ': mode !== 'forgot',
          hidden: mode === 'reset'
        }"
      >
        {{ description }}
        <RouterLink :to="goTo" class="text-blue-main font-bold">
          {{ descrSpan }}
        </RouterLink>
      </p>
    </div>
    <slot></slot>
    <p v-if="mode !== 'forgot'" class="hidden sm:block">
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
    },
    mode: {
      type: String,
      required: false
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
