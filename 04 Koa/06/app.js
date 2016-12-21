// koa多路径
import jade from 'jade'
import Koa from 'koa'
import views from 'koa-views'
import Router from 'koa-router'

import index from './routes/index.js'
import users from './routes/users.js'

const app = new Koa();
const router = new Router();

app
    .use(views(`${__dirname}/views`, {
        extension: 'jade',
    }))
    .use(router.routes())
    .use(router.allowedMethods())

router
    .use('/', index.routes(), index.allowedMethods())
    .use('/users', users.routes(), users.allowedMethods())

app
    .on('error', (err, ctx) => {
        console.log(err, ctx);
    })
    .listen(9000, () => {
        console.log('Server running at post 9000!')
    });