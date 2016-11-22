//密钥加密
var crypto = require('crypto'),
    fs = require('fs');

var pem = fs.readFileSync('data/key.pem'), //读取密钥
    key = pem.toString('ascii');

var hmac = crypto.createHmac('sha1', key); //生成一个sha1加密实例

hmac.update('forever'); //加密消息，生成消息摘要
console.log(hmac.digest('hex'));
