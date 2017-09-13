// 在Redis哈希表元素中存放数据
const redis = require('redis');

const client = redis.createClient(6379, '127.0.0.1');

client.on('error', err => {
  console.log(err);
});

// 设置哈希表元素
client.hmset('hash key', {
  'hashtest 1': 'Alpha',
  'hashtest 2': 'Beta',
}, redis.print);

client.hset("hash key", "hashtest 3", "Gammer", redis.print);
client.hset(["hash key", "hashtest 4", "Delta"], redis.print);

// 获取元素hashtest 1的值
client.hget('hash key', 'hashtest 1', (err, value) => {
  if (err) throw err;
  console.log(`hashtest 1 is: ${value}`);
});

client.hget('hash key', 'hashtest 4', (err, value) => {
  if (err) throw err;
  console.log(`hashtest 4 is: ${value}`);
});

// 获取哈希表的键
client.hkeys('hash key', (err, keys) => {
  if (err) throw err;
  console.log(keys.length + " replies:");
  keys.forEach((key, i) => {
    console.log("    " + i + ": " + key);
  })
});

// 获取完整的哈希表
client.hgetall('hash key', (err, obj) => {
  if (err) throw err;
  console.log(obj);
})

client.quit();