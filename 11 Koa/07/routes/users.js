import Router from 'koa-router';

const router = new Router();

router.get('/', async function(ctx, next) {
  ctx.state = {
    title: 'koa2 users'
  };
  await ctx.render('users', {});
})

export default router;