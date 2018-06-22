require('dotenv').config()
const express = require('express')
const watApi = require('./watApi')
const sendSlack = require('./lambda/sendSlack').handler
const mediumPosts = require('./lambda/mediumPosts').handler

const app = express()
app.use(express.json())

app.post('/submitEmailForm', (req, res) => {
  watApi.sendEmail(req.query, result => {
    if (result) {
      res.status(200).json({ message: 'Email sent successfully' })
    } else {
      res.status(500).json({ message: 'Error when sending email' })
    }
  })
})

const callback = res => (_, { statusCode, body }) => {
  res.status(statusCode).send(body)
}

app.post('/sendSlack', (req, res) => {
  sendSlack({
    httpMethod: 'POST',
    body: JSON.stringify(req.body),
  }, null, callback(res))
})

app.get('/mediumPosts', (req, res) => {
  mediumPosts({ httpMethod: 'GET' }, null, callback(res))
})

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app,
}
