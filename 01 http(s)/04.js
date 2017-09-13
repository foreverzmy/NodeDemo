//搭建http服务器的另一种写法
const http = require('http');
const server = http.Server();

var counter = 0;
server
  .on('request', (req, res) => {
    console.log(counter)
    counter++;
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.write(`I have been accessed ${counter} times.`);
    res.end();
  })
  .listen(9000, () => {
    console.log('Server running at port 9000!');
  });