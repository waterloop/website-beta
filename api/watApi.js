/* const Instagram = require('node-instagram').default
const twitter = require('twitter')

const {
  INSTA_ACCOUNT_CLIENT_ID,
  INSTA_ACCOUNT_CLIENT_SECRET,
  INSTA_ACCOUNT_ACCESS_TOKEN,
  TWITTER_ACCOUNT_CONSUMER_KEY,
  TWITTER_ACCOUNT_CONSUMER_SECRET,
  TWITTER_ACCOUNT_ACCESS_TOKEN_KEY,
  TWITTER_ACCOUNT_ACCESS_TOKEN_SECRET,
} = process.env

module.exports = {
  getInstaPosts(callback) {
    const instagram = new Instagram({
      clientId: INSTA_ACCOUNT_CLIENT_ID,
      clientSecret: INSTA_ACCOUNT_CLIENT_SECRET,
      accessToken: INSTA_ACCOUNT_ACCESS_TOKEN,
    })

    instagram.get('users/self/media/recent', (err, data) => {
      if (err) {
        callback(err)
      } else {
        callback(data)
      }
    })
  },

  getTweeterPosts(callback) {
    const twitterClient = new twitter({
      consumer_key: TWITTER_ACCOUNT_CONSUMER_KEY,
      consumer_secret: TWITTER_ACCOUNT_CONSUMER_SECRET,
      access_token_key: TWITTER_ACCOUNT_ACCESS_TOKEN_KEY,
      access_token_secret: TWITTER_ACCOUNT_ACCESS_TOKEN_SECRET,
    })

    const params = { screen_name: 'team_waterloop' }

    twitterClient.get('statuses/user_timeline', params, (error, tweets, response) => {
      if (!error) {
        callback(tweets)
      } else {
        callback(response)
      }

    })
  },
} */

const Twitter = require('twitter')

module.exports = {
  getTweets(callback) {
    const client = new Twitter({
      consumer_key: '5fGmRThAq1sn7PgKo0ycKMhkt',
      consumer_secret: 'Dk76R7jrvjP7YrMSDlvFdx4ZoVnLzcXleQmHIO9G3rWYHYUKsY',
      access_token_key: '2339211466-9zVgGApyQoDew7r6IsOkdfJVbv5Gv8euECqQ0Bl',
      access_token_secret: 'i0eoI0cPOVLoenFGU0yTrpIp50HFCxSkMWnSE9wLqAvur',
    })

    const params = {
      screen_name: 'team_waterloop',
      include_rts: false,
      tweet_mode: 'extended',
      include_entities: true,
    }

    client.get('statuses/user_timeline', params, (error, tweets, response) => {
      if (!error) {
        callback(tweets)
      } else {
        callback(response)
      }
    })
  },
}
