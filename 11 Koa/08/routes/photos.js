import Router from 'koa-router'
import Photo from '../lib/photoModel'

const router = new Router();

router.get('/', async ctx => {
  ctx.state = {
    title: 'Photo'
  };
  await Photo.find({}, (err, photos) => {
    if (err) throw err;
    ctx.state.photos = photos;
  });
  await ctx.render('photos')
});

export default router;