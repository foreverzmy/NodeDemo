// koa多路径
import Koa from 'koa';
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

app
    .on('error', (err) => {
        console.log('server error', err);
    })
    .listen(9000, () => {
        console.log('Server running at post 9000!')
    });