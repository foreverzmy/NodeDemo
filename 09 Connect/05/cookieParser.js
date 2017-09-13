const connect = require('connect');
const cookieParser = require('cookie-parser');

const app = connect();

app
  .use(cookieParser())
  .use(routes)
  .listen(9000, () => {
    console.log('Server running at port 9000.')
  });

function routes(req, res, next) {
  switch (req.url) {
    case '/':
      setCookie(req, res, next);
      break;
    case '/user':
      user(req, res, next);
      break;
  }

}

// 设置cookie
function setCookie(req, res, next) {
  let now = new Date();
  now.setMonth(now.getMonth() + 1);
  res.setHeader('Set-Cookie', 'foo=bar');
  res.setHeader('Set-Cookie', `tobi=ferret;Expires=${now.toGMTString()}`);
  res.end('Hello World.');
  next();
}

// 解析cookie
function user(req, res) {
  res.end(JSON.stringify(req.cookies));
}