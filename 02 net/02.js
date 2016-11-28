//监听所有的链接请求
const net = require('net');

const chatServer = net.createServer();

chatServer
    .on('connection', (client) => {
        client.write(`Hi\n`);
    })
    .on('data', (data) => {
        console.log(data);
    })
    .listen(9000, () => {
        console.log(`Net server running at port 9000!`)
    });
