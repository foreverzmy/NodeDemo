const Emitter = require('events');
const http = require('http');
const debug = require('debug');

module.exports = class Application extends Emitter {
  constructor() {
    super();
    this.midderware = [];
  }

  use(fn) {
    console.log(fn);
    this.midderware.push(fn);
    return this;
  }

  listen(...args) {
    debug('listen');
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }

  callback() {
    const handleRequest = (req, res) => {
      res.end('hello world!')
    }
    return handleRequest;
  }

}