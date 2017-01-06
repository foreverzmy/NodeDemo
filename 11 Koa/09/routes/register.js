import Router from 'koa-router';
import User from '../lib/user'

const router = new Router();

router.get('/', async ctx => {
  ctx.state = {
    title: 'Register'
  };
  await ctx.render('register');
});

router.post('/', async ctx => {
  let data = ctx.request.body.user;
  User.getByName(data.name, (err, user) => {
    if (err) throw err;
    if (user.id) {
      ctx.error('Username already taken!');
      ctx.redirect('back');
    } else {
      user = new User({
        name: data.name,
        pass: data.pass
      });
      user.save(err => {
        if (err) throw err;
        ctx.session.uid = user.id;
        ctx.redirect('/');
      })
    }
  })
})

export default router