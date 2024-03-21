<template>
  <section class="py-14 px-6 space-y-10">
    <div class="text-center space-y-6">
      <h1 class="font-bold text-2xl font-raleway">{{ title }}</h1>
      <p>
        {{ description }}
        <RouterLink v-if="route" :to="route">
          <span class="text-blue-main font-bold">{{ descrSpan }}</span>
        </RouterLink>
      </p>
    </div>
    <slot></slot>
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
      required: false,
      default: ''
    }
  }
}
</script>
