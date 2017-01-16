// 子进程实现非最有斐波那契数列
const http = require('http');
const cp = require('child_process');

const server = http.Server();


server
  .on('request', (req, res) => {
    let child = cp.fork(__dirname + '/fib', [req.url.substring(1)]);
    child.on('message', m => {
      res.writeHead(200);
      res.end(m.result + '\n');
    })
  })
  .listen(9000, () => {
    console.log('Server running at port 9000.')
  })