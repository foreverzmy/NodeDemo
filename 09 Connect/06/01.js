const connect = require('connect');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const session = require('cookie-session');

const app = connect();

const sessionOpt = {
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours 
}

app
  .use(favicon(__dirname + '/favicon.ico'))
  .use(cookieParser('keyborad cat'))
  .use(session(sessionOpt))
  .use((req, res, next) => {
    let sess = req.session;
    console.log(sess.views);
    if (sess.views) {
      sess.views++;
      res.setHeader('Content-type', 'text/html');
      res.write(`<p>views: ${sess.views}</p>`);
      res.end();
    } else {
      sess.views = 1;
      res.end('Welcome to the session demo. refresh!')
    }
  })
  .listen(9000, () => {
    console.log('Server running at port 9000.')
  })