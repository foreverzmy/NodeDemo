// 用集合存取或获取数据
const redis = require('redis');

const client = redis.createClient(6379, '127.0.0.1');

client.on('error', err => {
  console.log(err);
});

client.sadd('ip_addresses', '192.168.0.1', redis.print);
client.sadd('ip_addresses', '127.0.0.1', redis.print);
client.sadd('ip_addresses', '135.182.200.1', redis.print);

client.smembers('ip_addresses', (err, members) => {
  if (err) throw err;
  console.log(members);
});

client.quit();