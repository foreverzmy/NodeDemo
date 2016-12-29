//基于文件的存储方式
const fs = require('fs');
const path = require('path');

// 获取命令参数
let args = process.argv.splice(2);
// 取出第一个参数作为命令
let command = args.shift();
// 合并剩余的参数，用空格隔开
let taskDescription = args.join(' ');
// 根据当前目录解析存储文件路径
let file = path.join(process.cwd(), './.tasks');

switch (command) {
  case 'list': // list列出已保存的任务
    listTasks(file);
    break;
  case 'add': // add添加新任务
    addTasks(file, taskDescription);
    break;
  default: // 其它任何命令都会显示帮助
    console.log(`Usage: ${process.argv[0]} list|add [taskDescription].`);
    break;
}

// 获取已有的任务
function loadOrInitTashArray(file, cb) {
  // 检查.task文件是否已经存在
  fs.exists(file, (exists) => {
    let tasks = [];
    // 如果文件存在从中读取数据
    if (exists) {
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
        // 如果文件为空则初始化为[]
        let tasks = JSON.parse(data || '[]');
        cb(tasks);
      })
    } else { // 如果文件不存在返回空[]
      cb([]);
    }
  })
}
// 列出任务
function listTasks(file) {
  loadOrInitTashArray(file, tasks => {
    for (let val of tasks) {
      console.log(val);
    }
  })
}
// 将任务存储到文件中
function storeTasks(file, tasks) {
  fs.writeFile(file, JSON.stringify(tasks), 'utf8', err => {
    if (err) throw err;
    console.log('Saves!');
  })
}
// 添加任务
function addTasks(file, taskDescription) {
  loadOrInitTashArray(file, tasks => {
    tasks.push(taskDescription);
    storeTasks(file, tasks);
  })
}