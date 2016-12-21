import Router from 'koa-router'

const router = new Router();

router.get('/', async ctx => {
    ctx.body = 'This is a user response!';
})

export default router