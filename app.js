var express = require('express')
var jwt = require('express-jwt')
var service = require('./service.json')
var info = require('./routes/info')

var app = express()

var basePath = service.basePath

var infoPath = `${basePath}/info`

// Read JWT secret from environment
var secret = process.env.JWT_SECRET

// Everything protected by JWT unless /info.
app.use(
  jwt({ secret }).unless({
    path: [infoPath]
  })
)

app.get(infoPath, info)

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'invalid token...' })
  }
})

module.exports = app
