// 静态文件服务器
const http = require('http')
const parse = require('url').parse;
const join = require('path').join;
const fs = require('fs');

const root = __dirname;
const server = http.Server();

server
  .on('request', (req, res) => {
    let url = parse(req.url);
    // 构造绝对路径
    let path = join(root, url.pathname);
    fs.stat(path, (err, stat) => {
      if (err) {
        if ('ENOENT' === err.code) {
          res.statusCode = 404;
          res.end('Not Found');
        } else {
          res.statusCode = 500;
          res.end('Internal Server Error.')
        }
      } else {
        res.setHeader('Content-length', stat.size);
        let stream = fs.createReadStream(path);
        stream.pipe(res);
        // 处理错误请求
        stream.on('error', (err) => {
          res.statusCode = 500;
          res.end('Internal Server Error.')
        });
      }
    })

  })
  .on('error', (err) => {
    console.log(err);
  })
  .listen(9000, () => {
    console.log('Server running at port 9000.')
  })