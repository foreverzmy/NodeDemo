import Koa from 'koa'
import onerror from 'koa-onerror'
import Router from 'koa-router' //  路由
import routerCache from 'koa-router-cache'
import views from 'koa-views' // 视图
import bodyparser from 'koa-bodyparser' // 请求体解析
import static2 from 'koa-static2' // 静态文件缓存
import json from 'koa-json'
import logger from 'koa-logger'
import flash from 'koa-flash'
import gzip from 'koa-gzip'
import scheme from 'koa-scheme'

import session from 'koa-generic-session' // session中间件
import MongoStore from 'koa-generic-session-mongo' //session存到mongodb

import config from 'config-lite'
import mongo from 'mongoose' //mongodb驱动
import merge from 'merge-descriptors' //合并两个对象

import convert from 'koa-convert'

import core from './lib/core'
import renderConf from config.renderConf

const index = require('./routes/index');
const users = require('./routes/users');

const app = new Koa();
const router = new Router();

merge(renderConf.locals || {}, core, false)

app.keys = [renderConf.locals.$app.name]

onerror(app);

// middlewares
app
    .use(convert(bodyparser()))
    .use(convert(logger()))
    .use(convert(json()))
    .use(static2('public', `${__dirname}/public`))
    .use(convert(session({
        store: new MongoStore(config.mongodb)
    })))
    .use(convert(flash()))
    .use(convert(scheme(config.schemeConf)))

app.use(views(__dirname + '/views', {
    extension: 'jade'
}));

// logger
app.use(async(ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// router
router
    .use('/', index.routes(), index.allowedMethods())
    .use('/users', users.routes(), users.allowedMethods());

app.use(router.routes(), router.allowedMethods());
// response

app.on('error', (err, ctx) => {
    console.log(err)
    logger.error('server error', err, ctx);
});

export default app;