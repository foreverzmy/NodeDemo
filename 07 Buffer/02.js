//Buffer.write();
var b = new Buffer(5);
b.write('fffff'); //写入五个f字符
console.log(b);
b.write('ab', 1); //从第1位置开始写入两个字符
console.log(b);
