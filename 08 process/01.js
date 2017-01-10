// 在node退出前调用代码
process.on('exit', () => {
  setTimeout(() => {
    console.log('This will not run');
  }, 100);
  console.log('Bye');
})