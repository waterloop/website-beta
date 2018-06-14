<template>
  <div>
    <Header/>
    <nuxt/>
    <Footer/>
  </div>
</template>

<script>
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import Parallax from '~/components/Parallax'

import Vue from 'vue' // eslint-disable-line

Vue.component('Parallax', Parallax)

export default {
  components: {
    Header,
    Footer,
  },
}
</script>
