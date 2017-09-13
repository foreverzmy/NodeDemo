// 通过uncaughtException事假捕获异常
process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`);
  process.exit(1);
});

setTimeout(() => {
  console.log('This is still run.');
})

// 执行未定义函数，故意制造异常
nonexistenFunc();
console.log('This will not run.')