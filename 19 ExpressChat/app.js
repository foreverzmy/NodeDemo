import http from 'http'
import fs from 'fs'
import path from 'path'
import mine from 'mime'

import charServer from './lib/chat_server'
import send404 from './routes/send404'
import sendFile from './lib/sendFile'
import serverStatic from './lib/serverStatic'

const server = http.Server();

let cache = {}; // 静态资源缓存
// let onlineUser = {}; // 在线用户
let onlineCount = 1; // 在线人数
let currentRoom = {}; // 当前房间
let nickNames = {};
let nameUsed = [];


charServer(server);

server
  .on('request', (req, res) => {
    let filePaht = false;

    if (req.url === '/') { // 返回默认的HTML文件
      filePaht = 'views/index.html'
    } else {
      filePaht = `public${req.url}` // 将URL路径转为文件的相对路径
    }

    let absPath = `./${filePaht}`;
    serverStatic(res, cache, absPath); //返回静态文件
  })
  .listen(9000, () => {
    console.log('Server running at port 9000.')
  })