// 处理客户端退出
const net = require(`net`);

const chatServer = net.createServer();
let clientList = [];

chatServer
    .on(`connection`, (client) => { //监听用户连接进入
        client.write(`Hi\n`);
        clientList.push(client);
        client
            .on(`data`, (data) => { //监听用户发送信息
                for (let c of clientList) { //想所有用户广播信息
                    if (c !== client)
                        c.write(data);
                }
            })
            .on(`end`, () => { //监听客户端推出事件，将该客户端删除
                clientList.splice(clientList.indexOf(client), 1);
            })
    })
    .listen(9000, () => {
        console.log(`Net server running at port 9000!`)
    })
