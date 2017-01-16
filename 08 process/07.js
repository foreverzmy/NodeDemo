// 控制台输入输出
const requiredAge = 18;
// 指定用户要回答的问题
process.stdout.write('Please enter your age:');
// 设置stdin输出UTF-8编码的字符串，而不是直接输出缓冲区内容
process.stdin.setEncoding('utf8');

process.stdin.on('data', data => {
  let age = parseInt(data, 10);
  // 如果用户输出的不是有效数值，输出一条提示消息
  if (isNaN(age)) {
    console.log('%s is not a valid number!', data);
  } else if (age < requiredAge) {
    console.log(`You must be at least %d to enter, come back in %d years`, requiredAge, requiredAge - age);
  } else {
    enterTheSecretDungeon();
  }
  // 关闭stdin之前，等待一个data事件
  process.stdin.pause();
});
// 因为stdin开始处于暂停状态，所以调用resume()开始读取输入
process.stdin.resume();

function enterTheSecretDungeon() {
  console.log('Wlcome to The Program:')
}