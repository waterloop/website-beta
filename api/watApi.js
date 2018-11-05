const Twitter = require('twitter')

const {
  TWITTER_ACCOUNT_CONSUMER_KEY,
  TWITTER_ACCOUNT_CONSUMER_SECRET,
  TWITTER_ACCOUNT_ACCESS_TOKEN_KEY,
  TWITTER_ACCOUNT_ACCESS_TOKEN_SECRET,
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
