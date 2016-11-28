// 客户端之间进行通信
const net = require(`net`);

const chatServer = net.createServer();
let clientList = [];

chatServer
    .on(`connection`, (client) => {
        client.write(`Hi\n`);
        clientList.push(client);
        client.on(`data`, (data) => {
            for (let ii in clientList) {
                clientList[ii].write(data);
            }
        })
    })
    .listen(9000, () => {
        console.log(`Net server running at port 9000!`)
    })
