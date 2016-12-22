//公钥加密
var crypto = require('crypto');

//md5加密
var md5 = crypto.createHash('md5'); //生成一个md5加密实例
md5.update('forever'); //用md5对foo进行加密,不能直接重用，需要重新创建hash实例
console.log(md5.digest('hex')); //以16进制形式输出

//sha1加密
var sha1 = crypto.createHash('sha1');
sha1.update('forever'); //用md5对foo进行加密
console.log(sha1.digest('hex')); //以16进制形式输出

//不能直接重用，需要重新创建hash实例
var md52 = crypto.createHash('md5');
md52.update('foreverz'); //用md5对foo进行加密,
console.log(md52.digest('hex')); //以16进制形式输出
