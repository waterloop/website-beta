<script>
import axios from '~/plugins/axios'

const types = {
  TWITTER: 0,
  FACEBOOK: 1,
}

const toString = type => {
  switch (type) {
  case types.TWITTER:
    return 'Twitter'
  case types.FACEBOOK:
    return 'Facebook'
  }
  return ''
}

const sortByTimeDesc = (a, b) => {
  a = a.created_time
  b = b.created_time
  if (a < b) {
    return 1
  }
  if (a > b) {
    return -1
  }
  return 0
}

const twitterMapper = tweet => ({
  type: types.TWITTER,
  id: tweet.id,
  createdTime: tweet.created_time,
  picture: tweet.picture,
  content: tweet.full_text,
  url: tweet.url,
})

const fbMapper = post => ({
  type: types.FACEBOOK,
  id: post.id,
  createdTime: post.created_time,
  picture: post.full_picture,
  content: post.message,
  url: post.link,
})

export default {
  data() {
    return {
      tweets: null,
      facebook: null,
    }
  },
  computed: {
    posts() {
      const posts = []
      const { tweets, facebook } = this
      if (tweets) {
        posts.push(...tweets.map(twitterMapper))
      }
      if (facebook) {
        posts.push(...facebook.map(fbMapper))
      }
      posts.sort(sortByTimeDesc)
      return posts
    },
  },
  mounted() {
    axios.get('/api/twitterPosts').then(({ data }) => {
      this.tweets = data
    })
    axios.get('/api/fbPosts').then(({ data }) => {
      this.facebook = data
    })
  },
  methods: { toString },
}

</script>

<!-- started making some sort of grid layout, but scrap it if you want -->
<template>
  <div class="tweet-grid">
    <a
      v-for="post in posts"
      :key="post.id"
      :href="post.url"
      class="social-card light-bg"
      target="_blank"
      rel="noopener noreferrer nofollow"
    >
      <img
        v-if="post.picture"
        :src="post.picture">
      <div class="description">
        <h3>{{ toString(post.type) }}</h3>
        <p>{{ post.content }}</p>
      </div>
    </a>
  </div>
</template>

<style lang="scss">
.tweet-grid {
  column-count: 2;
  column-gap: 5px;
}

.social-card {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 20px;

  .description {
    padding: 10px;
  }
}
</style>
