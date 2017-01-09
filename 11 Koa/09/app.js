import Koa from 'koa'
import Router from 'koa-router'
import views from 'koa-views'
import convert from 'koa-convert'
import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import favicon from 'koa-favicon'
import statc from 'koa-static'
import session from 'koa-session'
import locals from 'koa-locals'

import messages from './lib/messages'
import register from './routes/register'
import index from './routes/index'
import login from './routes/login'
import logout from './routes/logout'

const app = new Koa();
const router = new Router();
locals(app, locals);

// middlewares
app
  .use(convert(session(app)))
  .use(convert(favicon(__dirname + '/public/favicon.ico')))
  .use(convert(bodyparser()))
  .use(convert(logger()))
  .use(convert(statc(__dirname + '/public')))
  // .use(messages)

app
  .use(views(`${__dirname}/views`, {
    extension: 'jade'
  }))
  .use(router.routes())
  .use(router.allowedMethods())

// logger
app.use(async(ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

router
  .use('/', index.routes(), index.allowedMethods())
  .use('/register', register.routes(), register.allowedMethods())
  .use('/login', login.routes(), login.allowedMethods())
  .use('/logout', logout.routes(), logout.allowedMethods())

// response
app.on('error', function(err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx);
});


export default app;