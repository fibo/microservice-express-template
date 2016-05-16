var pkg = require('./package.json')
var service = require('./service.json')
var debug = require('debug')(pkg.name)
var http = require('http')

var basePath = service.basePath
var port = service.port

var server = http.Server(app)

server.on('listening', function () {
  debug('basePath', basePath)
  debug('Listening on port %d', port)
})

server.listen(port)
