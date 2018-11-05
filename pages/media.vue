<script>
import axios from '~/plugins/axios';

export default {
  data: function() {
    return {
      tweets: null
    }
  },
  mounted: function() {
    axios.get('/api/twitterPosts').then((response) => {
      this.tweets = response.data.data;
      console.log(this.tweets);
    });
  }
}

</script>

<!-- if you need any more of the twitter content, uncomment the console log above and look through the data availabale -->
<!-- started making some sort of grid layout, but scrap it if you want -->
<template>
  <div class="tweet-grid">
    <div class="social-card" v-for="tweet in tweets" :key="tweet.id">
      <img v-if="tweet.entities.hasOwnProperty('media')" v-bind:src="tweet.entities.media[0].media_url"/>
      <div class="description">
        <h3>Waterloop</h3>
        <p>{{tweet.full_text}}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.tweet-grid {
  -webkit-column-count: 2;
  -webkit-column-gap:   5px;
  -moz-column-count:    2;
  -moz-column-gap:      5px;
  column-count:         2;
  column-gap:           5px;
  .social-card {
    margin: 20px;
    //width: 100% !important;
    //height: auto !important;
    .description {
      padding: 10px;
    }
    background-color: #fafafa;
  }

}

</style>
