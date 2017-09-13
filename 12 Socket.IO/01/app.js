// 服务器端时间实时更新到浏览器
const app = require('http').createServer(handler);
// 将普通服务器升级为SocketIO服务器
const io = require('socket.io')(app);
const fs = require('fs');

const html = fs.readFileSync('./index.html', 'utf8');

function handler(req, res) {
  res.setHeader('Content-type', 'text/html');
  res.setHeader('Content-length', Buffer.byteLength(html, 'utf8'));
  res.end(html);
}

function tick() {
  // 获取当前的UTC时间
  let now = new Date().toUTCString();
  // 将时间发送给所有连接上来的客户端
  io.sockets.send(now);
}

setInterval(tick, 1000);

app
  .listen(9000, () => {
    console.log('Server running at post 9000.');
  })