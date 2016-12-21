import Router from 'koa-router'

const router = new Router();

router.get('/', async ctx => {
    await ctx.render('users');
})

export default router