// 使用发布/订阅实现简单聊天服务器
const net = require('net');
const redis = require('redis');

const server = net.Server();

// 为每个连接到服务器的用户定义设置逻辑
server.on('connection', (socket) => {
  console.log('client connected.');
  // 为用户创建预定客户端
  let client = redis.createClient(6379, '127.0.0.1');
  // 为用户创建发布客户端
  let publicsher = redis.createClient(6379, '127.0.0.1');
  client.subscribe('main_chat_room');
  client.on('error', err => {
    console.log(err);
  });

  // 信道收到消息把它发送给用户
  client.on('message', (channel, message) => {
    socket.write(`Channel ${channel}: ${message}`);
  });

  socket
  // 用户输入消息后发布它
    .on('data', data => {
      publicsher.publish('main_chat_room', data);
    })
    // 用户断开连接后终止客户端连接
    .on('end', () => {
      client.unsubscribe('main_chat_room');
      publicsher.quit();
      client.quit();
    })
    .on('error', (e) => { //错误处理
      console.log(e);
    })
});

server.listen(9000, () => {
  console.log('Server running at port 9000.')
});