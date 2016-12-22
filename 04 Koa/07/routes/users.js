import Router from 'koa-router';

const router = new Router();

router.get('/', function(ctx, next) {
    ctx.body = 'this a users response!';
});

export default router;