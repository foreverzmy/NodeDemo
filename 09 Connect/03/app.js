const connect = require('connect');
const router = require('./router');

var routes = {
  GET: {
    '/users': function(req, res) {
      res.end('tobi, loki, ferret');
    },
    '/user/:id': function(req, res, id) {
      res.end(`user ${id}`);
    }
  },
  DELETE: {
    'user/:id': function(req, res, id) {
      res.end(`delete user ${id}`);
    }
  }
};

const app = connect();

app
  .use(router(routes))
  .listen(9000, () => {
    console.log('Server running at port 9000.')
  })