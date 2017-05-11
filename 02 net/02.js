//监听所有的链接请求
const net = require(`net`);

const chatServer = net.createServer();

chatServer
  .on(`connection`, (client) => { //监听客户端连接
    console.log(client)
    client
      .on('data', (data) => { //监听用户发送信息
        console.log(data);
      })
      .on('end', () => { //监听客户端推出事件，将该客户端删除
        console.log('end');
      }).on('error', (e) => { //错误处理
        console.log(e);
      })
  })
  .on('error', (e) => { //错误处理
    console.log(e);
  })
  .listen(9000, () => {
    console.log(`Net server running at port 9000!`)
  });