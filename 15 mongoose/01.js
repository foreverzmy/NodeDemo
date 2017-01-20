// 引入 mongoose 模块
const mongoose = require('mongoose');
// 连接数据库
const db = mongoose.connect('mongodb://localhost/tasks');

const Schema = mongoose.Schema;

// 注册schema
const TasksSchema = new Schema({
  project: String,
  description: String
});
mongoose.model('Task', TasksSchema);

let Task = mongoose.model('Task');

// 增加一条数据
let task = new Task();
task.project = 'Bikeshed';
task.description = 'Paint the biskshed red.';
task.save(err => {
  if (err) throw err;
  console.log('Task saved.');
});

// 增加多条数据
Task.create([{
  project: 'Cookie',
  description: 'Cook dinner'
}, {
  project: 'Buy',
  description: 'Buy cloth'
}], err => {
  if (err) throw err;
  console.log('Task saved.');
})

// 查
Task.find({ 'project': 'Bikeshed' }, (err, tasks) => {
  for (let ii in tasks) {
    console.log(`ID:${tasks[ii]._id}`);
    console.log(tasks[ii].description);
  }
});

Task.update({
  _id: "5866247453157e32343e4f13" // 用内部ID更新
}, {
  description: 'Paint the biskshed green'
}, {
  multi: false // 只更新一个文档，设为false
}, (err, rows_updated) => {
  if (err) throw err;
  console.log(rows_updated);
});

// 删
Task.remove({ project: 'Bikeshed' }, (err, docs) => {
  console.log(docs);
  console.log('remove success');
})

// 断开连接
mongoose.disconnect();