const http = require('http');
const fs = require('fs');
const formidable = require('formidable');

const server = http.Server();

server
  .on('request', (req, res) => {
    switch (req.method) {
      case 'GET':
        show(req, res);
        break;
      case 'POST':
        upload(req, res);
        break;
    }
  })
  .listen(9000, () => {
    console.log('Server running at port 9000.')
  })

// 提供带有文件上传控件的HTML表单
function show(req, res) {
  let stream = fs.createReadStream('./views/index.html');
  res.setHeader('Content-type', 'text/html');
  stream.pipe(res);
}

// 文件上传
function upload(req, res) {
  if (!isFormData(req)) {
    res.statusCode = 400;
    res.end('Bad Request:expecting multipart/form-data');
    return;
  }
  const form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = `${__dirname}/tmp`;
  /*
    form
      .on('field', (field, value) => {
        console.log(field);
        console.log(value);
      })
      // 上传完成后发出file事件
      .on('file', (name, file) => {
        console.log(name);
        console.log(file);
      })
      .on('end', () => {
        res.end('upload complete!')
      })
      //计算上传进度
      .on('progress', (bytesReceived, bytesExpected) => {
        let percent = Math.floor(bytesReceived / bytesExpected * 100);
        console.log(percent);
      })
    form.parse(req);
  */
  form
    .parse(req, (err, fields, files) => {
      console.log(fields);
      console.log(files);
      res.end('upload complete!');
    })
    .on('progress', (bytesReceived, bytesExpected) => {
      let percent = Math.floor(bytesReceived / bytesExpected * 100);
      console.log(percent);
    })
}

function isFormData(req) {
  let type = req.headers['content-type'] || '';
  return 0 == type.indexOf('multipart/form-data');
}