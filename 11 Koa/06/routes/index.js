import Router from 'koa-router'

const router = new Router();

router.get('/', async ctx => {
    ctx.state = {
        title: 'koa-views',
        name: 'forever'
    };
    await ctx.render('index')
})

export default router;