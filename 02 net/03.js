// 客户端之间进行通信
const net = require(`net`);

const chatServer = net.createServer();
let clientList = [];

chatServer
    .on(`connection`, (client) => { //监听客户端连接
        client.write(`Hi\n`);
        clientList.push(client);
        client.on(`data`, (data) => { //监听客户端信息
            for (let c of clientList) { //想所有客户端广播信息
                if (c !== client)
                    c.write(data);
            }
        })
    })
    .listen(9000, () => {
        console.log(`Net server running at port 9000!`)
    })
