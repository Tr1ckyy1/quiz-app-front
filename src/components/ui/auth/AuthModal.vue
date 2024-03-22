<template>
  <section class="py-14 px-6 space-y-10 bg-white">
    <div class="text-center space-y-6 sm:text-left">
      <h1 class="font-extrabold text-2xl font-raleway sm:text-4xl">{{ title }}</h1>

      <p class="sm:hidden block">
        {{ description }}
        <button class="text-blue-main font-bold" @click="swap">
          {{ descrSpan }}
        </button>
      </p>
    </div>
    <slot></slot>
    <p class="hidden sm:block">
      {{ description }}
      <RouterLink v-if="route" :to="route" class="text-blue-main font-bold">
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
    route: {
      type: String,
      required: false
    }
  },
  inject: {
    swap: { default: null }
  }
}
</script>
