// 挂载中间件和服务器
const connect = require('connect');

const app = connect();

app
  .use(logger)
  .use('/admin', restrict)
  .use('/admin', admin)
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

function restrict(req, res, next) {
  let authorization = req.headers.authorization;
  if (!authorization) return next(new Error('Unauthorized'));

  let parts = authorization.split(' ');
  let scheme = parts[0];
  let auth = new Buffer(parts[1], 'base64').toString().split(':');
  let user = auth[0];
  let pass = auth[1];

  // 根据数据库中的记录检查认证信息
  authenticateWithDatabase(user, pass, err => {
    // 告诉分派器错了
    if (err) return next(err);
    // 如果信息有效，不带参数调用next
    next();
  })
}

function admin(req, res, next) {
  switch (req.url) {
    case '/':
      res.end('Hello World!');
      break;
    case '/users':
      res.setHeader('Content-type', 'application/json');
      res.end(JSON.stringify(['tobi', 'loki', 'jane']));
      break;
  }
  next();
}