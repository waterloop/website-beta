<template>
  <section
    class="vh-100 nav-gap relative overflow-hidden flex white cover-shadow">
    <Parallax class="absolute-bg">
      <img
        ref="img"
        v-bind="$attrs"
        :style="imgStyle"
        :class="imgClass"
        class="responsive-img">
    </Parallax>
    <slot/>
  </section>
</template>

<script>
/* eslint-disable vue/require-prop-types */

export default {
  inheritAttrs: false,
  props: [
    'imgClass',
    'imgStyle',
  ],
}
</script>

