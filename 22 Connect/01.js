const connect = require('connect');

const app = connect();

app
  .use(logger)
  .use(hello)
  .listen(9000, () => {
    console.log('Server running at port 9000.');
  });

function logger(req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
}

function hello(req, res) {
  res.setHeader('Content-type', 'text/plain');
  res.end('Hello World.');
}