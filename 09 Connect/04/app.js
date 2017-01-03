const connect = require('connect');

const app = connect();

app
  .use(users)
  .use(pets)
  .use(errorHandler)
  .use(hello)
  .listen(9000, () => {
    console.log('Server running at port 9000.')
  });

function hello(req, res, next) {
  if (req.url.match(/^\/hello/)) {
    res.end('Hello World\n');
  } else {
    next();
  }
}

const db = {
  users: [
    { name: 'tobi' },
    { name: 'loki' },
    { name: 'jane' }
  ]
};

function users(req, res, next) {
  let match = req.url.match(/^\/user\/(.+)/);
  let user = '';
  if (match) {
    // 判断用户名是否在数据库中
    for (let val of db.users) {
      if (val.name === match[1]) {
        user = val;
      }
    }

    if (user) { // 如果用户存在，则被串行化为JSON
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(user));
    } else { // 否则将一个错误对象notFound的属性设置为true，传给next函数
      let err = new Error('User not found');
      err.notFound = true;
      next(err);
    }
  } else {
    next();
  }
}

// foo()函数也会触发异常，但不会呀err.notFound属性
function pets(req, res, next) {
  if (req.url.match(/^\/pet\/(.+)/)) {
    foo();
  } else {
    next();
  }
}

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.setHeader('Content-Type', 'application/json');
  if (err.notFound) {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: err.message }));
  } else {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
}