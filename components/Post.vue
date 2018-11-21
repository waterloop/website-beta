<!--<div v-if="tweet.entities.media[0].type = 'photo'"> -->

<template>
  <div class="social-card">
    <div>
      <img
        max-height= "50px;"
        max-width= "50px;"
        src="{{twitterLogo}}">

        <!-- <img src="this.extended_entities.media[0].media_url_https">  -->
    </div>
    <div
      v-if="twitter"
      class="center">
      <img :src="twitterLogo" >
    </div>
    <div class="description">
      <h3>Waterloop</h3>
      <p>{{ content }}</p>
      <p2>@team_waterloop</p2>
    </div>
    <div class="date">

      <p>{{ date }}</p>
    </div>

    <!--hyperlinks to facebook and twitter -->
  </div>
</template>

<script>
/* eslint-disable vue/require-prop-types */
// import twitterLogo from '../assets/img/index/twitter.svg'

export default {
  props: [ 'imag', 'mediaLogo', 'content', 'waterloopLogo', 'postDate', 'account' ],
  data() {
    this.date = formatPostDate(this.postDate)
    // this.photo = .....this.imag
  },
}




function formatPostDate(postDate) {
  let formattedDate
  const currentDate = new Date()
  const timeDifference = Math.abs(currentDate.getTime() - postDate.getTime())
  const differenceInDays = Math.ceil(timeDifference / 1000 * 3600 * 24)

  if (differenceInDays < 1) {
    formattedDate = 'Today'
  } else if (differenceInDays < 7) {
    formattedDate = `${ differenceInDays } days ago`
  } else if (differenceInDays < 28) {
    formattedDate = `${ differenceInDays / 7 } weeks ago`
  } else {
    formattedDate = postDate.toLocaleDateString()
  }

  return formattedDate
}
</script>

<style lang='scss'>
@import '~/assets/css/variables.scss';

.social-card {
  background-color: #fafafa;
  margin: 20px;
  width: 250px;
}

.description {
  padding: 10px;

  > h3 {
    align-self: center;
    color: $brand-yellow;
    height: 45;
    text-align: center;
  }

  > .p2 {
    font-size: 5px;
    padding-top: 10px;
    text-align: center;
    vertical-align: bottom;
  }
}

.p {
  align-self: center;
}

.date {
  background-color: #000;
  color: #808080;
  text-align: center;
}
</style>
