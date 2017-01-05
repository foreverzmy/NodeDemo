import Router from 'koa-router'
import Photo from '../lib/photoModel'
import path from 'path'
import fs from 'fs'
import koaDownload from 'koa-resume-download'

const router = new Router();
const join = path.join;
const Download = koaDownload.Download;

router.get('/', async ctx => {
  let id = ctx.params.id;
  await Photo.findById(id, (err, photo) => {
    if (err) throw err;
    let path = join(`${process.cwd()}/public/images`, 'nodejs-green.png');
    let opts = {
      headers: {
        'Content-disposition': 'attachment; filename=nodejs-green.png'
      }
    };
    let download = new Download(ctx, opts);
    download.start(path)
  })
})

export default router;