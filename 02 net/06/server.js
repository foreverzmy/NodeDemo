const net = require(`net`);

const chatServer = net.createServer();

chatServer
  .on(`connection`, socket => { //监听客户端连接
    socket
      .on('data', data => {
        console.log(data.toString());
        socket.write('world!\r\n');
      })
      .on('end', () => {
        console.log('Some one quiet.');
      })
  })
  .listen(9005, () => {
    console.log(`Net server running at port 9000!`)
  });