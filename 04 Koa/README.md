# Koa2 模块的使用

[koa中文文档](https://github.com/guo-yu/koa-guide)

## 01.js：简单koa2服务器

## 02.js：快速开始koa2

### 1、创建npm配置文件

```npm
npm init
```

### 2、创建项目文件

```
// 在项目根目录创建
app.js   // 项目入口文件
start.js // 项目启动文件
```

### 3、下载依赖

```npm
npm  install  koa@next --save
npm install babel-core --save-dev
npm install babel-polyfill --save-dev
npm install babel-preset-es2015 --save-dev
npm install babel-preset-stage-3 --save-dev
```

### 4、编写文件

start.js:

```javascript
// start.js
require("babel-core/register")(
    {
        presets: ['stage-3','es2015']
    }
);
require("babel-polyfill");
require("./app.js");
```

app.js:

```javascript
// app.js
const Koa = require('koa');
const app = new Koa();
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
// response
app.use(ctx => {
  ctx.body = 'Hello Koa5555';
});
app.listen(3000);
```

5、启动项目

```npm
// 首先下载
npm install nodemon  -g
nodemon start
打开浏览器，访问页面
```

## 03：koa2中的cookie

## 04：koa2多路径处理

koa2可以使用多路径处理简单的页面跳转。

## 05：koa2复杂路由处理

当路由比较复杂是就需要koa-router插件来进行处理了

使用API

```javascript
import Router from 'koa-router';
const router = new Router();
router
  .get('/', async ctx => {
    ctx.body = 'Hello World!';
  })
  .post('/users', async ctx => {
    // ... 
  })
  .put('/users/:id', async ctx => {
    // ... 
  })
  .del('/users/:id', async ctx => {
    // ... 
  });
app
  .use(router.routes())
  .use(router.allowedMethods())
```

## 06：koa-views模板中间件

[koa-views](https://github.com/queckezz/koa-views)

```npm
$ npm install koa-views@next
```

## API

```js
views(root, opts)
```

* root：视图所在位置，必须是绝对路径。
* opts：可选。

|opts|用法|作用|
|----|---|----|
|extension|extension: 'jade'|设置视图默认扩展名|
|map|map:{html:'jade'}|文件扩展名映射|
|engineSource|engineSource: {foo: () => Promise.resolve('bar')}|替换扩展名为bar|
|options|...|传递参数|

在koa中使用jade模板引擎

```javascript
import views from 'koa-views'
app.use(views(__dirname, { extension: 'jade',... }))
```

## 07：使用koa-generator创建koa2项目

```npm
$ npm i -g koa-generator 
$ koa2 myApp && cd myApp
$ npm install
$ npm start
```

此时访问3000端口就可以了。

