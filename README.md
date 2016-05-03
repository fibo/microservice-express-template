# microservice-express-template

> is an example of Microservice component implemented with express

* [Installation](#installation)
* [Service](#service)
* [API](#api)
* [Development](#development)
* [License](#license)

## Installation

With [npm][npm] do

```bash
$ npm install --production
```

## Service

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

## Development

### Test

Requirement: install all deps with `npm install`.

Then run tests with

```
npm t
```

### Debug

How to launch server in debug mode

```
export DEBUG=*
node server.js
```

## License

[MIT](http://g14n.info/mit-license/)

<sub>This service adhere to the [Microservice component][microservice_component] definition.</sub>

[npm]: https://npmjs.com
[microservice_component]: https://gist.github.com/fibo/6c4c15eeb4016309d7378d579ff143d6
