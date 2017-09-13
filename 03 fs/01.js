// 读取文件
const { readFile } = require('fs');

let filehandle = readFile('data/data.txt', function(err, data) {
  if (err) {
    console.log(err)
  } else {
    console.log(data.toString());
  }
})