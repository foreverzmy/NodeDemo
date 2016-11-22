var fs = require('fs');

fs.readFile('data/data.txt',function(err, data) {
 console.log(data.toString());
 fs.unlink('data/data.txt');
});

fs.readFile('data/浙江小泰科技有限公司校园招聘招生简章.doc',function(err, data) {
 console.log(data.toString());
});
