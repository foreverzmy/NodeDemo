//创建Buffer
var rgb = new Buffer([255, 0, 149]);
console.log(rgb);

console.log(new Buffer(10)); //不会初始化
console.log(new Buffer('Hello World!', 'ascii'));
console.log(new Buffer('Hello World!', 'utf8'));
console.log(new Buffer('你好，世界！', 'ascii'));
console.log(new Buffer('你好，世界！', 'utf8'));

console.log(Buffer.byteLength(rgb)); //获取字符串在编码上的字节长度
