// koa多路径
const Koa = require('koa');
const app = new Koa();

app
    .use(async(ctx, next) => {
        if (ctx.path !== '/')
            return await next();
        ctx.body = 'We are at home!';
    })
    .use(async(ctx, next) => {
        if (ctx.path !== '/404')
            return await next();
        ctx.body = 'Page not found!';
    })
    .use(async(ctx, next) => {
        if (ctx.path !== '/500')
            return await next();
        ctx.body = 'Internal server error!';
    })

app.listen(9000, () => {
    console.log('Server running at post 9000!')
});
