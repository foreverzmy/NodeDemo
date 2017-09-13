//搭建简单的http服务器
const http = require('http');

http
  .createServer((req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.end('Hello World!');
  })
  .listen(9000, () => {
    console.log('Server running at port 9000!');
  });