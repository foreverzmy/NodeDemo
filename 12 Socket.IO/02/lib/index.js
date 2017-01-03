const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

app.get('/', (req, res) => {
  console.log(module.filename)
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});
// 在线用户
var onlineUser = {};
// 在线人数
var onlineCount = 0;

io.on('connection', (socket) => {
  // 监听新用户加入
  socket.on('login', (obj) => {
    console.log(obj);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });
});

http.listen(9000, () => {
  console.log('listening on *:9000');
});