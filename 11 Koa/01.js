// 简单koa服务器
const Koa = require('koa');
const app = new Koa();

app
  .use((ctx, next) => {
    console.log('Hello World!');
    next();
  })
  .use(ctx => {
    ctx.body = 'Hello World!';
  });

app.listen(9000, () => {
  console.log('Server running at port 9000.')
});