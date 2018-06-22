const slackmailer = require('slack-node')
const axios = require('axios')

const {
  SLACK_ACCOUNT_API_TOKEN,
  ROCKETCHAT_INSTANCE,
  ROCKETCHAT_USER,
  ROCKETCHAT_PASSWORD,
} = process.env

exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body)
  const done = (statusCode, err, res) => callback(null, {
    statusCode,
    body: err ? err.message : JSON.stringify(res),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })

  if (event.httpMethod === 'POST') {
    const slackClient = new slackmailer(SLACK_ACCOUNT_API_TOKEN)
    const text = `*Incoming contact us request:*\n*Name:* \`${ data.name }\`\n*Email:* ${ data.email }\n*Message:* ${ data.message }`

    Promise.all([ new Promise((resolve, reject) => slackClient.api('chat.postMessage', {
      token: SLACK_ACCOUNT_API_TOKEN,
      text,
      channel: '#contact_us',
    }, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })), axios.post(ROCKETCHAT_INSTANCE + '/api/v1/login', {
      user: ROCKETCHAT_USER,
      password: ROCKETCHAT_PASSWORD,
    })
      .then(({ data }) =>
        axios.post(ROCKETCHAT_INSTANCE + '/api/v1/chat.postMessage', {
          channel: '#contact_us',
          text,
        }, {
          headers: {
            'X-Auth-Token': data.data.authToken,
            'X-User-Id': data.data.userId,
          },
        })) ])
      .then(() => {
        done(200, null, { success: true })
      })
      .catch(err => {
        console.log(err)
        done(500, new Error('Error when sending message'))
      })
  } else {
    done(400, new Error(`Unsupported method "${ event.httpMethod }"`))
  }
}
