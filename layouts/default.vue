<template>
  <div>
    <Header/>
    <nuxt/>
    <Footer/>
  </div>
</template>

<script>
import Cover from '~/components/Cover'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import MainArrow from '~/components/MainArrow'
import Parallax from '~/components/Parallax'

import Vue from 'vue' // eslint-disable-line

Vue.component('Cover', Cover)
Vue.component('Parallax', Parallax)
Vue.component('MainArrow', MainArrow)

export default {
  components: {
    Header,
    Footer,
  },
}
</script>
