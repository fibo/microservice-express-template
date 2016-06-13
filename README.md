# microservice-express-template

> is an example of Microservice component implemented with express

[Installation](#installation) |
[Service](#service) |
[API](#api) |
[Authentication](#authentication) |
[Development](#development) |
[License](#license)

## Installation

With [npm] do

```bash
npm install --production
```

## Service

Make sure `JWT_SECRET` env var is set properly, see [Authentication](#authentication) section.

* start: `npm start`
* stop: `npm stop`

## API

### `GET /info`

> returns service information

#### Responses

##### 200

> get info

```
{
  name: string
  version: string
}
```

## Authentication

[JSON Web Tokens][JWT] are used to provide authentication. To make it work
it is necessary to share a **secret** between the client and the server.
To make it dead easy, an environment variable `JWT_SECRET` is used.
Make sure to set it properly, for instance

```bash
export JWT_SECRET="devS3cret"
```

All routes are protected by authentication except `/info`.

## Development

### Test

Requirements:

1. Install all deps with `npm install`.
2. Set `JWT_SECRET`, see [Authentication](#authentication).

Then run tests with

```bash
npm t
```

### Debug

How to launch server in debug mode

```bash
export DEBUG=*
node server.js
```

### Release

Bump package version and push corresponding tag to origin. Choose among
*major*, *minor* or *patch* options according to [Semantic versioning][semantic_versioning]

```bash
npm version [major|minor|patch]
```

## License

[MIT](http://g14n.info/mit-license/)

<sub>This service adhere to the [Microservice component][microservice_component] definition.</sub>

[npm]: https://npmjs.com "npm"
[microservice_component]: https://gist.github.com/fibo/6c4c15eeb4016309d7378d579ff143d6 "Microservice component definition"
[JWT]: https://en.wikipedia.org/wiki/JSON_Web_Token "JSON Web Token"
[semantic_versioning]: http://semver.org/ "Semantic Versioning"
