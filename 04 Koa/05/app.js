// koa-router多路径
import Koa from 'koa';
import Router from 'koa-router';

const app = new Koa();
// 路由前缀
const router = new Router( /*{ prefix: '/users' }*/ );

router
    .get('/', async ctx => {
        ctx.body = "<a href='about'>Hello World!</a>";
    })
    // 多个中间件
    .get('/about',
        async(ctx, next) => {
            await next();
            ctx.body += "about";
        },
        async ctx => {
            ctx.body = 'forever\n';
        })
    .get('/:name', async ctx => {
        ctx.body = ctx.params.name;
    })
    // 命名URL
    .get('user', '/users/:id', ctx => {
        ctx.body = ctx.params.name;
    })
    .url('user', { id: 3 });

app
    .use(router.routes())
    .use(router.allowedMethods())
    .on('error', (err) => {
        console.log('server error', err);
    })
    .listen(9000, () => {
        console.log('Server running at post 9000!')
    });