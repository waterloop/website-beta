const medium = require('medium-get-latest-posts')

const { MEDIUM_ACCOUNT_USERNAME } = process.env

exports.handler = (event, context, callback) => {
  const done = (statusCode, err, res) => callback(null, {
    statusCode,
    body: err ? err.message : JSON.stringify(res),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })

  if (event.httpMethod === 'GET') {
    medium.getPublisherLatestPosts(MEDIUM_ACCOUNT_USERNAME).then(data => {
      const blog = data.slice(0, 3).map(each => {
        delete each.tags
        return each
      })
      done(200, null, { blog })
    })
      .catch(err => {
        console.log(err)
        done(500, new Error('Could not get medium posts'))
      })
  } else {
    done(400, new Error(`Unsupported method "${ event.httpMethod }"`))
  }
}
