<template>
  <div class="container white">
    <p
      v-html="json">{{ error.statusCode }} {{ error.message }}</p>
    <p>
      <a href="/">Home</a><br>
      <a href="/contact">Contact</a>
    </p>
  </div>
</template>
<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    json() {
      return JSON.stringify(this.error, 0, 2)
    },
  },
}
</script>]
