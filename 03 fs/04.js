// 文件流
const http = require('http');
const fs = require('fs');

const server = http.Server();

server
  .on('request', (req, res) => {
    res.writeHead(200, {
      'Content-type': 'image/jpg'
    })
    let stream = fs.createReadStream('./image/image.jpg');
    stream
      .on('data', (trunk) => {
        console.log(trunk);
      })
      .on('end', () => {
        console.log('finished');
      })
      .pipe(res);
  })
  .listen(9000, () => {
    console.log('Server running at port 9000.')
  })