// 设置和获取环境变量
let debug;
// 根据环境变量DEBUG定义debug函数
if (process.env.DEBUG) {
  debug = function(data) {
    console.error(data);
  }
} else {
  debug = function() {}
}

debug('this is a debug call.');

console.log('Hello World!');

debug('this another debug call.')