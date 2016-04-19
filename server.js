var pkg = require('./package.json')
var service = require('./service.json')
var debug = require('debug')(pkg.name)
var express = require('express')
var http = require('http')

var baseURL = service.baseURL
var port = service.port

var app = express()
var server = http.Server(app)

function info (req, res) {
  res.send(json({ name: pkg.name, version: pkg.version }))
}

app.get(`${baseURL}/info`, info)

server.on('listening', function () {
  debug('Listening on port %d', port)
})

server.listen(port)
