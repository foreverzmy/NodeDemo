# Redis数据库操作

[Redis教程](http://www.runoob.com/redis/redis-tutorial.html)

Redis是一个是一个高性能的key-value数据库。Redis是完全在RAM中保存数据的数据库，并在磁盘中记录数据的变化。这样做的缺点是它的存储空间有限，但好处是数据操作非常快。

Redis非常适合处理那些不需要长期访问的简单数据存储，比如短信验证码和游戏中的数据。

## 01.js：操作Redis中的数据

首先通过`redis.createClient(6379, '127.0.0.1')`连接Redis数据库，然后通过`get`、`set`对数据进行读写操作。`redis.print`会返回操作的结果。

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

哈希表，也被称为哈希映射，是一个`string`类型的field和value的映射表，特别适合于**存储对象**。

可以用`hset`逐条存储，也可以用`hmset`批量存储。可以用`hget`逐条查询，也可以用`hgetall`获得完整的哈希表。

## 03.js：Redis链表

链表是Redis支持的另一种数据结构，是简单的有序字符串列表，按照插入顺序排序。

从概念上讲，Redis链表类似于**数组**。然而链表的缺点在于从中获取数据的性能。随着链表长度的增长，数据获取也会逐渐变慢(时间复杂度O(n))。

`lpush`向链表中添加值，`lrange`获取参数`start`和`end`范围内的链表元素。如`03.js`中`start`为`2`，`end`为`4`。

## 04.js：Redis集合

Redis集合是一组无序的字符串组。集合获取数据的性能比链表好。它获取集合成员所用的时间取决于集合的大小(时间复杂度O(1))。

集合中的元素必须是唯一的，如果把两个相同的值存到集合中，第二次尝试会被忽略。

`sadd`尝试将值添加到集合中，`smembers`返货存储在集合中的值。