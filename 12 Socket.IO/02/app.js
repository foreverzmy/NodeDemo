// 监听重载
const fs = require('fs');
const url = require('url');
const http = require('http');
const path = require('path');
const Koa = require('koa');
const socket = require('socket.io');
const convert = require('koa-convert');
const statc = require('koa-static');

const app = new Koa();
const server = http.Server(app.callback());
const io = socket(server);

app
  .use(async(ctx, next) => { // 监视有static中间件返回的文件
    let file = url.parse(ctx.path).pathname;
    let mode = 'stylesheet';
    if (file === '/') {
      file = 'index.html';
      mode = 'reload';
    }
    // 确定要提供的文件名并调用方法
    await next();
    createWatcher(file, mode);
  })
  // 将服务器设置为基本的静态文件服务器
  .use(convert(statc(__dirname)))

// 保存被检测的活动文件清单
let wathcers = {};

function createWatcher(file, event) {
  let absolute = path.join(__dirname, file);
  if (wathcers[absolute]) {
    return;
  }
  // 最后修改事件变化则激发Socket.IO事件
  // fs.watchFile(absolute, (curr, prev) => {
  //   if (curr.mtime.getTime() !== prev.mtime.getTime()) {
  //     io.sockets.emit(event, file);
  //   }
  // });
  fs.watch(absolute, (e, filename) => {
    if (e === 'change') {
      io.sockets.emit(event, file);
    }
  });
  // 将文件标记为检测对象
  wathcers[absolute] = true;
}

server.listen(9000, () => {
  console.log('Server running at port 9000.')
})