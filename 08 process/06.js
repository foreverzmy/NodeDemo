// 控制台请求网页
const http = require('http');
const url = require('url');

let target = url.parse(process.argv[2]);

http.get(target, res => {
  res.pipe(process.stdout);
})