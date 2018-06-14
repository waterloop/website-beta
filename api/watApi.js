/* eslint-disable no-console */

const nodemailer = require('nodemailer')
const Instagram = require('node-instagram').default
const slackmailer = require('slack-node')
const twitter = require('twitter')
const medium = require('medium-get-latest-posts')
require('dotenv').config()

const {
  EMAIL_ACCOUNT_USERNAME,
  EMAIL_ACCOUNT_PASSWORD,
  SLACK_ACCOUNT_API_TOKEN,
  INSTA_ACCOUNT_CLIENT_ID,
  INSTA_ACCOUNT_CLIENT_SECRET,
  INSTA_ACCOUNT_ACCESS_TOKEN,
  TWITTER_ACCOUNT_CONSUMER_KEY,
  TWITTER_ACCOUNT_CONSUMER_SECRET,
  TWITTER_ACCOUNT_ACCESS_TOKEN_KEY,
  TWITTER_ACCOUNT_ACCESS_TOKEN_SECRET,
  MEDIUM_ACCOUNT_USERNAME,
} = process.env

if (!(
  EMAIL_ACCOUNT_USERNAME
  && EMAIL_ACCOUNT_PASSWORD
  && SLACK_ACCOUNT_API_TOKEN
  && INSTA_ACCOUNT_CLIENT_ID
  && INSTA_ACCOUNT_CLIENT_SECRET
  && INSTA_ACCOUNT_ACCESS_TOKEN
  && TWITTER_ACCOUNT_CONSUMER_KEY
  && TWITTER_ACCOUNT_CONSUMER_SECRET
  && TWITTER_ACCOUNT_ACCESS_TOKEN_KEY
  && TWITTER_ACCOUNT_ACCESS_TOKEN_SECRET
  && MEDIUM_ACCOUNT_USERNAME
)) {
  throw new Error('Some environment variables are missing!')
}

module.exports = {
  sendEmail(data, callback) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_ACCOUNT_USERNAME,
        pass: EMAIL_ACCOUNT_PASSWORD,
      },
    })

    const mailOptions = {
      from: EMAIL_ACCOUNT_USERNAME,
      to: 'nikolaevra@hotmail.com',
      subject: `Contact us request: ${ data.subject }`,
      text: `Incoming contact us request:\nName: ${ data.firstname } ${ data.lastname }\nEmail: ${ data.email }\nSubject: ${ data.subject }\nMessage: ${ data.msg }`,
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
        callback(false)
      } else {
        console.log('Email sent: ' + info.response)
        callback(true)
      }
    })
  },

  sendSlack(data, callback) {
    const slackClient = new slackmailer(SLACK_ACCOUNT_API_TOKEN)

    slackClient.api('chat.postMessage', {
      token: SLACK_ACCOUNT_API_TOKEN,
      text: `*Incoming contact us request:*\n*Name:* \`${ data['entry.204801274'] }\`\n*Email:* \`${ data['entry.79140437'] }\`\n*Message:* ${ data['entry.59625375'] }`,
      channel: '#contact_us',
    }, err => {
      if (err) {
        callback(false)
      } else {
        callback(true)
      }
    })
  },

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

  getMediumPosts(callback) {
    medium.getPublisherLatestPosts(MEDIUM_ACCOUNT_USERNAME).then(data => {
      callback(data)
    })
      .catch(err => {
        console.log(err)
        callback(err)
      })
  },
}
