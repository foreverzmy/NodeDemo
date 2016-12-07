//搭建http服务器的另一种写法
const http = require('http');
const server = http.Server();

server
    .on('request', (req, res) => {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.write('Hello World!');
        res.end();
    })
    .listen(9000, () => {
        console.log('Server running at port 9000!');
    });
