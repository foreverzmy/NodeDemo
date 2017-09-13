// 用有序集合存取或获取数据
const redis = require('redis');

const client = redis.createClient(6379, '127.0.0.1');

client.on('error', err => {
  console.log(err);
});

client.zadd('work', 1, 'Alpha', redis.print);
client.zadd('work', 2, 'Beta', redis.print);
client.zadd('work', 3, 'Gamma', redis.print);

client.zrangebyscore('work', 1, 3, (err, members) => {
  if (err) throw err;
  console.log(members);
});

client.quit();