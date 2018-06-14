<template>
  <div
    ref="rellax"
    :data-rellax-percentage="percentage">
    <slot />
  </div>
</template>

<script>
import Rellax from 'rellax'

function construct() {
  this.rellax = new Rellax(this.$refs.rellax, {
    speed: -4,
    ...this.$attrs,
  })
}

function destruct() {
  this.rellax.destroy()
}

const component = {
  props: {
    percentage: {
      type: String,
      default: '0.5',
    },
  },
  mounted: construct,
  beforeDestroy: destruct,
}

if (process.env.NODE_ENV !== 'production') {
  Object.assign(component, {
    beforeUpdate: destruct,
    updated: construct,
  })
}

export default component
</script>
