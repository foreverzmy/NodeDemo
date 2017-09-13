# fs文件模块

## 01.js：读取文件的内容

## 02.js：删除文件

## 03.js：创建文件并写入内容

## 04.js：流数据

流数据类似特殊的数组，只不过数组中的数据是分散在空间中，而数据流中的数据是分散在时间上的，通过将数据一块一块的传送，可以每收到一块数据就开始处理，而不用等所有数据都全到再做处理。

只要新的数据块准备好，就会激发`data`事假，当所有的数据块都加载完之后，会激发一个`end`事件。这是一种高效的数据处理方式，只要有数据准备好就可以处理，不用等着读取完整个资源再把它写出去。

Node中的`res`对象也是可写数据流的一种，可以用`fs.createReadStream`读取文件数据，然后通过`.pipe`将数据送到`res`客户端。在数据流动时，事件轮训还能处理其它事件。

可以简写为

```javascript
fs.createReadStream('./image/image.jpg').pipe(res);
```

## File Storage

用文件存放系统数据。一般用这种存储方式保存程序的配置信息，也可以用它做数据的持久化保存，这些数据在程序和服务器重启后依然有效。

`process.argv`会获取输入的命令,例如`node app.js`，返回命令行脚本的各个参数组成的数组。

这是一个命令行版任务存储列表工具。

可以用以下命令添加/查看任务。

```
$ node app.js add Buy some hats.
Saved
$ node app.js list
Buy some hats.
$ node app.js 18:00 dinner.
Saved.
$ node app.js list
Buy some hats.
18:00 dinner.
$ node app.js help
Usage: node.exe list|add [taskDescription].
```

## 05.js：移动文件

一个看起来简单，并且非常常见的文件系统交互任务，是把文件从一个目录挪到另一个目录中。在UNIX平台上用mv命令，Windows上是move命令。

Node中有一个`fs.rename()`函数，可以移动文件，但是这个函数不能跨越物理设备(比如两个硬盘)，否则会抛出一个`EXDEV`错误。所以要对其进行优化。

## 06.js：监测文件的变化

`fs.watchFile()`用轮询的方式检查文件是否发生了变化,所以在某些平台上很消耗资源。但是这个时间间隔是可以通过参数设置的。

变量`curr`是当前的`fs.Stat`对象，`prev`是前一个`fs.Stat`对象，它俩应该有同一个文件上的不同时间戳。

`fs.watch()`是在Node v0.6中引入的。它用平台本地的文件修改通知API监测文件，所以它比fs.watchFile()性能更优。因此这个函数也能监测一个目录下任一文件的变化。但是`fs.watch()`不如fs.watchFile()可靠，因为各种平台底层的文件监测机制是不同的，导致这个方法不能保证在所有平台上可用。