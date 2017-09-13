// 获取命令参数
let args = process.argv.splice(2);
// 取出第一个参数作为命令
let command = args.shift();
// 合并剩余的参数，用空格隔开
let taskDescription = args.join(' ');

console.log(command);
console.log(taskDescription);