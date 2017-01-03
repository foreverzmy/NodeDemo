import Koa from 'koa'
import onerror from 'koa-onerror'
import Router from 'koa-router' //  路由
import views from 'koa-views' // 视图
import static2 from 'koa-static2' // 静态文件缓存

const index = require('./routes/index');
const users = require('./routes/users');

const app = new Koa();
const router = new Router();

// middlewares
app
  .use(static2('public', `${__dirname}/public`))
  .use(views(`${__dirname}/views`, {
    extension: 'jade'
  }));

// logger
app.use(async(ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// router
router
  .use('/', index.routes(), index.allowedMethods())
  .use('/users', users.routes(), users.allowedMethods());

app.use(router.routes(), router.allowedMethods());
// response

app.on('error', (err, ctx) => {
  console.log(err)
  logger.error('server error', err, ctx);
});

export default app;