import Router from 'koa-router';

const router = new Router()

router.get('/', async ctx => {
  ctx.session.destroy(err => {
    if (err) throw err;
    ctx.redirect('/');
  })
});

export default router;