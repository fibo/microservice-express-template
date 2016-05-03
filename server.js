var pkg = require('./package.json')
var service = require('./service.json')
var info = require('./routes/info')
var debug = require('debug')(pkg.name)
var express = require('express')
var http = require('http')

var basePath = service.basePath
var port = service.port

var app = express()
var server = http.Server(app)

app.get(`${basePath}/info`, info)

server.on('listening', function () {
  debug('basePath', basePath)
  debug('Listening on port %d', port)
})

server.listen(port)
