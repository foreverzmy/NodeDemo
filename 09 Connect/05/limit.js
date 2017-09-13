// 用户输入限制
const connect = require('connect');
const limit = require('limit');

const app = connect();

app
  .use(type('application/x-www/form-urlencoded'), limit('64kb'))
  .use(type('application/json'), limit('32kb'))
  .use(type('image'), limit('2mb'))
  .use(type('video'), limit('300mb'))
  .use(hello)
  .listen(9000, () => {
    console.log('Server running at port 9000.');
  });

function type(type, fn) {
  return function(req, res, next) {
    // 被返回的中间件首先检车content—type
    let ct = req.headers['content-type'] || '';
    if (ct.indexOf(type)) {
      return next();
    }
    fn(req, res, next);
  }
}