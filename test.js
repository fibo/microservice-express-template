var app = require('./app')
var request = require('supertest')
var test = require('tape')
var service = require('./service.json')
var pkg = require('./package.json')
var jsonwebtoken = require('jsonwebtoken')

var basePath = service.basePath

test('GET /info', (t) => {
  request(app)
    .get(`${basePath}/info`)
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

test('GET /protected', (t) => {
  var protectedPath = `${basePath}/foo`

  var expected = { hello: 'I am protected by JWT' }
  var email = 'jsmith@example.org'
  var secret = process.env.JWT_SECRET

  var token = jsonwebtoken.sign({ email }, secret)

  app.get(protectedPath, function (req, res) {
    res.json(expected)
  })

  app.get(protectedPath)
  request(app)
    .get(protectedPath)
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .end((err, res) => {
      t.error(err, 'no error')

      t.deepEqual(res.body, expected, 'token verification')

      t.end()
    })
})

test('Authorization', (t) => {
  // Do a request without Authorization header to the basePath,
  // which should be protected.
  request(app)
    .get(basePath)
    .set('Accept', 'application/json')
    .expect(401)
    .end((err, res) => {
      if (err) {
        t.deepEqual(res.body, { error: 'invalid token...' }, 'invalid token')
      }

      t.end()
    })
})
