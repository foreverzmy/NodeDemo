const redis = require('redis');

const client = redis.createClient(6379, '127.0.0.1');

client.on('error', err => {
  console.log(err);
});

// 增
client.set('color', 'green', redis.print);

// 查
client.get('color', (err, value) => {
  if (err) throw err;
  console.log(value);
});

client.quit();