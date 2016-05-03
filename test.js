var express = require('express')
var request = require('supertest')
var test = require('tape')

var pkg = require('./package.json')
var info = require('./routes/info')

test('info', (t) => {
  var app = express()

  app.use('/info', info)

  request(app)
    .get('/info')
    .set('Accept', 'application/json')
    .expect(200)
    .end((err, res) => {
      t.error(err, 'no error')

      t.deepEqual(res.body, {
        name: pkg.name,
        version: pkg.version
      }, 'returns package info')

      t.end()
    })
})
