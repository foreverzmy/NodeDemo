import Router from 'koa-router'
import Photo from '../lib/photoModel'
import path from 'path'
import fs from 'fs'

const router = new Router();
const join = path.join;

router.get('/', async ctx => {
  ctx.state = {
    title: 'Photos upload'
  };
  await ctx.render('upload')
})

router.post('/', async(ctx, next) => {
  // let img = ctx.files.photo.image;
  // let name = ctx.body.photo.name || img.name;
  // let path = join(`${__dirname}/public/images`, img.name);
  // fs.rename(img.path, path, err => {
  //   if (err) throw next(err);
  Photo.create({
      name: 'Node.js Logo',
      path: 'http://nodejs.org/images/logos/nodejs-green.png'
    }, err => {
      if (err) return next(err);
    })
    // })
  ctx.redirect('/');
})

export default router;