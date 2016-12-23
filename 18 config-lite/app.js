// 设置配置文件夹
process.env.CONFIG_DIR = 'config2';
// 设置配置文件名
process.env.NODE_ENV = 'test';

const config = require('config-lite');

console.log(config.Alpha);
// console.log(config.$0);
console.log(config.ding)