// 用链表存取或获取数据
const redis = require('redis');

const client = redis.createClient(6379, '127.0.0.1');

client.on('error', err => {
  console.log(err);
});

client.lpush('tasks', 'Alpha', redis.print);
client.lpush('tasks', 'Beta', redis.print);
client.lpush('tasks', 'Gamma', redis.print);

client.lrange('tasks', 2, 4, (err, items) => {
  if (err) throw err;
  items.forEach((item, i) => {
    console.log(' ' + item);
  })
});

client.quit();