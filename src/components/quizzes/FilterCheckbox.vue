<template>
  <label
    :for="select"
    class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden peer-checked:block"
  >
    <svg
      class="sm:block hidden"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 3L4.5 8.5L2 6"
        stroke="white"
        stroke-width="1.6666"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <svg
      class="block sm:hidden"
      width="12"
      height="9"
      viewBox="0 0 12 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.6668 1.5L4.25016 7.91667L1.3335 5"
        stroke="#7F56D9"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </label>
</template>

<script>
export default {
  props: ['select']
}
</script>
