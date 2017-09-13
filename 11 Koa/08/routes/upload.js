import Router from 'koa-router'
import Photo from '../lib/photoModel'
import path from 'path'
import fs from 'fs'
import asyncBusboy from 'async-busboy';

const router = new Router();
const join = path.join;

router.get('/', async ctx => {
  ctx.state = {
    title: 'Photos upload'
  };
  await ctx.render('upload')
})

router.post('/', async ctx => {
  const { files, fields } = await asyncBusboy(ctx.req);
  let filename = files[0].filename;
  let lastname = /\.\w+$/.exec(files[0].path)[0];
  let filepath = files[0].path;
  let name = fields.photo.name + lastname;
  let path = join('/images', name);
  await fs.createReadStream(filepath).pipe(fs.createWriteStream(`${process.cwd()}/public${path}`));
  Photo.create({
    name: name,
    path: path
  }, err => {
    if (err) throw err;
  })
  fs.unlink(filepath, err => {
    if (err) throw err;
  })

  ctx.redirect('/');
})

export default router;