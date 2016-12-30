# Redis数据库操作

[Redis教程](http://www.runoob.com/redis/redis-tutorial.html)

Redis是一个是一个高性能的key-value数据库。Redis是完全在RAM中保存数据的数据库，并在磁盘中记录数据的变化。这样做的缺点是它的存储空间有限，但好处是数据操作非常快。

Redis非常适合处理那些不需要长期访问的简单数据存储，比如短信验证码和游戏中的数据。

## 01.js：操作Redis中的数据

首先通过`redis.createClient(6379, '127.0.0.1')`连接Redis数据库，然后通过`get`、`set`对数据进行读写操作。

```javascript
client.set('color', 'red', redis.print); // =>Reply: OK
client.get('color', (err, value) => {
  if (err) throw err;
  console.log(value); // =>red
});
```

对应的数据库操作为:

```
SET color "red"
OK
GET color
"red"
```

以上示例中我们使用了Redis的SET和 GET命令。键为color，对应的值为red。

## 02.js：Redis哈希表

哈希表，也被称为哈希映射，是一个`string`类型的field和value的映射表，特别适合于存储对象。

可以用`hset`逐条存储，也可以用`hmset`批量存储。可以用`hget`逐条查询，也可以用`hgetall`获得完整的哈希表。