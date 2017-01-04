import Koa from 'koa';
import Router from 'koa-router';
import views from 'koa-views';
import convert from 'koa-convert';
import json from 'koa-json';
import onerror from 'koa-onerror';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import favicon from 'koa-favicon'

const index = require('./routes/index');
const users = require('./routes/users');

const app = new Koa();
const router = new Router();

// middlewares
app
  .use(favicon(__dirname + '/public/favicon.ico'))
  .use(convert(bodyparser()))
  .use(convert(json()))
  .use(convert(logger()))
  .use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'jade'
}));

// logger
app.use(async(ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

router.use('/', index.routes(), index.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());

app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function(err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx);
});


module.exports = app;