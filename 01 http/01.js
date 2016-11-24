//搭建简单的http
const http = require('http');

http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!');
}).listen(9000, () => {
    console.log('Server running at port 9000!');
});
