const express = require('express')
const watApi = require('./watApi')

const app = express()

app.post('/submitEmailForm', (req, res) => {
  watApi.sendEmail(req.query, result => {
    if (result) {
      res.status(200).json({ message: 'Email sent successfully' })
    } else {
      res.status(500).json({ message: 'Error when sending email' })
    }
  })

})

app.post('/submitSlackForm', (req, res) => {
  watApi.sendSlack(req.body, result => {
    if (result) {
      res.status(200).json({ message: 'Slack sent successfully' })
    } else {
      res.status(500).json({ message: 'Error when sending message' })
    }
  })
})

app.get('/mediumPosts', (req, res) => {
  watApi.getMediumPosts(data => {
    res.json({ blog: data.slice(0, 3) })
  })
})

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app,
}
