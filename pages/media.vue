<script>
import axios from '~/plugins/axios'

export default {
  data() {
    return { tweets: null }
  },
  mounted() {
    axios.get('/api/twitterPosts').then(response => {
      this.tweets = response.data.data
    })
  },
}

</script>

<!-- if you need any more of the twitter content, uncomment the console log above and look through the data availabale -->
<!-- started making some sort of grid layout, but scrap it if you want -->
<template>
  <div class="tweet-grid">
    <div
      v-for="tweet in tweets"
      :key="tweet.id"
      class="social-card">
      <img
        v-if="tweet.entities.hasOwnProperty('media')"
        :src="tweet.entities.media[0].media_url">
      <div class="description">
        <h3>Waterloop</h3>
        <p>{{ tweet.full_text }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.tweet-grid {
  column-count: 2;
  column-gap: 5px;
}

.social-card {
  background-color: #fafafa;
  margin: 20px;

  .description {
    padding: 10px;
  }
}
</style>
