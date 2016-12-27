// http处理请求
const http = require('http')
const url = require('url')

const server = http.Server();

let items = [];

server
  .on('request', (req, res) => {
    // 用res.method请求所用的方法。
    switch (req.method) {
      case 'POST':
        // 设置字符串缓存
        let item = '';
        req.setEncoding('utf8');
        req
          .on('data', chunk => {
            // 将数据块拼接到字符串缓存上
            item += chunk;
          })
          .on('end', () => {
            items.push(item);
            res.end('OK\n');
          });
        break;
      case 'GET':
        let body = items.map((item, i) => {
          return `${i}) ${item} \n`;
        }).join('\n');
        res.setHeader('Content-length', Buffer.byteLength(body));
        res.setHeader('Content-type', 'text/plain;charset="utf-8"')
        res.end(body);
        break;
      case 'DELETE':
        let path = url.parse(req.url).pathname;
        let i = parseInt(path.slice(1), 10);
        if (isNaN(i)) {
          res.statusCode = 400;
          res.end('Invalid item id');
        } else if (!items[i]) {
          res.statusCode = 404;
          res.end('Item not found.');
        } else {
          items.splice(i, 1);
          res.end('OK\n');
        }
        break;
    }
  })
  .listen(9000, () => {
    console.log('Server running at port 9000.')
  })