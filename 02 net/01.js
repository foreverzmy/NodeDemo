/*简单net服务器
win下需要在windows功能中开启Telnet客户端
开启node服务器
然后在控制台使用命令telnet 127.0.0.1 9000连接服务器
*/
const net = require(`net`);

const chatServer = net.Server();

chatServer
  .on(`connection`, (client) => {
    client.write(`Hi\n`);
    client.write(`Bye\n`);
    client.end();
  })
  .listen(9000, () => {
    console.log('Server running at port 9000.')
  });