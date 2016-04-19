var pkg = require('./package.json')
var service = require('./service.json')
var debug = require('debug')(pkg.name)
var express = require('express')
var http = require('http')

var basePath = service.basePath
var port = service.port

var app = express()
var server = http.Server(app)

function info (req, res) {
  res.send(json({ name: pkg.name, version: pkg.version }))
}

app.get(`${basePath}/info`, info)

server.on('listening', function () {
  debug('Listening on port %d', port)
})

server.listen(port)
