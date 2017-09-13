// 设置cookie
import Koa from 'koa';

const app = new Koa();

app.use(async ctx => {
    let n = ~~ctx.cookies.get('view') + 1;
    ctx.cookies.set('view', n);
    ctx.body = n + ' views';
});

app
    .on('error', (err) => {
        console.log('server error', err);
    })
    .listen(9000, () => {
        console.log('Server running at post 9000!')
    });