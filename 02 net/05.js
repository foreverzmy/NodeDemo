// 检查socket可写状态和记录错误
const net = require(`net`);

const chatServer = net.createServer();
let clientList = [];

chatServer
  .on('connection', client => { //监听用户连接进入
    client.name = client.remoteAddress + `:` + client.remotePort;
    client.write(`Hi ${client.name}\n`);
    console.log(client.name + `joined`);

    clientList.push(client);

    client
      .on('data', data => { //监听用户发送信息
        broadcast(data, client);
      })
      .on('end', () => { //监听客户端推出事件，将该客户端删除
        console.log(client.name + `quit`);
        clientList.splice(clientList.indexOf(client), 1);
      })
      .on('error', e => { //错误处理
        console.log(e);
      })
  })
  .listen(9000, () => {
    console.log('Net server running at port 9000!');
  })

function broadcast(message, client) {
  let cleanup = [];
  for (let c of clientList) {
    if (c != client) {
      if (c.writable) { //检测socket是否可写，即客户端是否断开
        c.write(message)
      } else {
        cleanup.push(c);
        c.destroy(); //将不可写的socket关闭
      }
    }
  }
  for (let c of cleanup) {
    clientList.splice(clientList.indexOf(c), 1);
  }
}