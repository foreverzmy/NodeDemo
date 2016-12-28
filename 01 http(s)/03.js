// http服务器实现301临时重定向
const http = require('http');

http
    .createServer((req, res) => {
        res.writeHead(302, {
            'Location': 'Http://www.baidu.com'
        });
        res.end();
    })
    .listen(9000, () => {
        console.log("Server running at port 9000!");
    });
