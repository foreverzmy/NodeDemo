// 监听重载
const fs = require('fs');
const url = require('url');
const http = require('http');
const path = require('path');
const express = require('express');
const socket = require('socket.io');
const cache = require('serve-static-cache');

const app = express();
const server = http.Server(app);
const io = socket(server);

const root = __dirname;

console.log(cache)

app
  .use((req, res, next) => { // 监视有static中间件返回的文件
    req.on('static', () => { // 注册由static()发射的static事件
      let file = url.parse(req.url).pathname;
      let mode = 'stylesheet';
      console.log(file)
      if (file[file.length - 1] === '/') {
        file += 'index.html';
        mode = 'reload';
      }
      // 确定要提供的文件名并调用方法
      createWatcher(file, mode);
    })
    next();
  })
  // 将服务器设置为基本的静态文件服务器
  .use(express.static(root))

// 保存被检测的活动文件清单
let wathcers = {};

function createWatcher(file, event) {
  let absolute = path.join(root, file);
  console.log(absolute);
  if (wathcers[absolute]) {
    return;
  }
  // 最后修改事件变化则激发Socket.IO事件
  fs.watchFile(absolute, (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
      io.sockets.emit(event, file);
    }
  });
  // 将文件标记为检测对象
  wathcers[absolute] = true;
}

server.listen(9000, () => {
  console.log('Server running at port 9000.')
})