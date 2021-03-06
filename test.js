const app = require('./server')
const request = require('supertest')
const test = require('tape')
const service = require('./service.json')
const pkg = require('./package.json')
const jsonwebtoken = require('jsonwebtoken')

const basePath = service.basePath

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
  const protectedPath = `${basePath}/foo`

  const expected = { hello: 'I am protected by JWT' }
  const email = 'jsmith@example.org'
  const secret = process.env.JWT_SECRET

  const token = jsonwebtoken.sign({ email }, secret)

  app.get(protectedPath, (req, res) => res.json(expected))

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
