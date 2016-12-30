# 使用mongoose操作mongodb

MongoDB是一个通用的NoSQL数据库，把文档存在集合中，它们不需要相同的schema，每个文档都可以有不同的schema。这使得MongoDB比传统的数据库更灵活。

Mongoose是一个Node模块，它的模型提供了一个到MongoDB集合接口，以及一些实用的功能，比如schema层次结构，中间件以及数据校验。

安装：

```npm
$ npm i -S mongoose
```
连接数据库：

```javascript
const db = mongoose.connect('mongodb://localhost/tasks');
```
其中，前面那个`mongodb`是protocol scheme的名称；`localhost`是mongod所在的地址,端口号省略则默认连接27017；`tasks`是数据库的名称

mongodb 中不需要建立数据库，当你需要连接的数据库不存在时，会自动创建一个出来。

## 01.js：操作mongodb中的数据

