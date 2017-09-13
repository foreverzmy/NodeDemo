//公钥加密
var crypto = require('crypto'),
    fs = require('fs');

var pem = fs.readFileSync('data/key.pem'), //读取私钥
    key = pem.toString('ascii');

var cipher = crypto.createCipher('blowfish', key); //读取key并利用blowfish加密算法生成cipher实例

cipher.update('forever', 'binary', 'hex'); //将要加密的字符传入
var encrypted = cipher.final('hex'); //输出加密串
console.log(encrypted);

var decipher = crypto.createDecipher('blowfish', key); //读取key并利用blowfish加密算法生成decipher实例

decipher.update(encrypted, 'hex', 'binary'); //将要解密的字符传入
var decrypted = decipher.final('binary'); //输出解密后的内容
console.log(decrypted);

var output = new Buffer(decrypted); //转为二进制形式
