import Router from 'koa-router';
import User from '../lib/user'

const router = new Router();

router.get('/', async ctx => {
  ctx.state = {
    title: 'Login'
  };
  await ctx.render('login');
});

router.post('/', async ctx => {
  let data = ctx.request.body.user;
  User.authenticate(data.name, data.pass, (err, user) => {
    if (err) throw err;
    if (user) {
      ctx.session.uid = user.id;
      ctx.redirect('/');
    } else {
      ctx.locals.error('Sorry!invalid credentials.')
      ctx.redirect('back');
    }
  })
})

export default router