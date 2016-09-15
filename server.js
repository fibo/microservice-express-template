'use strict'

const pkg = require('./package.json')
const service = require('./service.json')

const debug = require('debug')(pkg.name)

const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
const jwt = require('express-jwt')
const info = require('./routes/info')

const app = express()

const basePath = service.basePath
const port = service.port

const infoPath = `${basePath}/info`

// Read JWT secret from environment.
const secret = process.env.JWT_SECRET

app.use(cors())

app.use(helmet())

// Everything protected by JWT unless /info.
app.use(
  jwt({ secret }).unless({
    path: [infoPath]
  })
)

app.get(infoPath, info)

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'invalid token...' })
  }
})

// Prevent server crashing on unhandled exception.
process.on('uncaughtException', (er) => {
  debug(er.stack)
})

// Start server if it is the main script.
if (module === require.main) {
  app.listen(port, () => {
    debug('basePath', basePath)
    debug('Listening on port %d', port)
  })
}

// Export app for testing purpouse.
module.exports = app
