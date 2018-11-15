const Twitter = require('twitter')
const axios = require('axios')

const {
  TWITTER_ACCOUNT_CONSUMER_KEY,
  TWITTER_ACCOUNT_CONSUMER_SECRET,
  TWITTER_ACCOUNT_ACCESS_TOKEN_KEY,
  TWITTER_ACCOUNT_ACCESS_TOKEN_SECRET,
  FACEBOOK_ACCESS_TOKEN,
} = process.env

module.exports = {
  getTweets(callback) {
    const client = new Twitter({
      consumer_key: TWITTER_ACCOUNT_CONSUMER_KEY,
      consumer_secret: TWITTER_ACCOUNT_CONSUMER_SECRET,
      access_token_key: TWITTER_ACCOUNT_ACCESS_TOKEN_KEY,
      access_token_secret: TWITTER_ACCOUNT_ACCESS_TOKEN_SECRET,
    })

    const params = {
      screen_name: 'team_waterloop',
      include_rts: false,
      tweet_mode: 'extended',
      include_entities: true,
      exclude_replies: true,
    }

    client.get('statuses/user_timeline', params, (error, tweets) => {
      if (error) {
        throw error
      }
      callback(tweets.map(tweet => {
        const fullText = tweet.full_text
        const { media } = tweet.entities
        const urlIndex = fullText.lastIndexOf(' ')

        return {
          created_at: new Date(tweet.created_at).toISOString(),
          id: tweet.id,
          full_text: fullText.substring(0, urlIndex),
          picture: media && media.length > 0 ? media[0].media_url_https : null,
          url: fullText.substring(urlIndex + 1),
        }
      }))
    })
  },
  getFacebook(callback) {
    axios.get(`https://graph.facebook.com/v3.2/teamwaterloop/posts?fields=created_time,full_picture,message,link&access_token=${ FACEBOOK_ACCESS_TOKEN }`)
      .then(response => {
        callback(response.data.data)
      })
  },
}
