## 基于socket.io的简单的聊天应用

翻译：[ForeverZ](http://foreverz.cn/)

本文翻译自[socket.io官网](http://socket.io/)的[Get Started: Chat application](http://socket.io/get-started/chat/)，文中对其中的程序略有改动，全部由ES6实现，同时添加了一些注释。由于功力不够，翻译中出现的错误还请指正。

以下是翻译内容：

在本指南中，我们将创建一个简单的聊天应用，它几乎不需要`Node.js`或者`Socket.IO`的基础知识，所以它是所有用户的理想选择。

###　简介

使用流行的web应用程序栈，如LAMP(PHP)，编写聊天应用程序历来非常困难。它包括轮询更改服务器和记录时间戳，因此它会慢的多。

Sockets一直以来是构建大多数实时聊天系统的解决方案，在客户端和服务器之间提供双向通信信道。

这意味着服务器可以将消息推送到客户端，我们的想法是：每当你发一条信息，服务器会接收它并推送给其它连接的客户端。

###　web框架

第一个目标是建立一个简单的HTML页面，提供一个表单和一个消息列表，我们将使用Node.js的web框架`express`做这一步，确保Node.js已安装。

首先创建一个`package.json`清单文件来描述项目，建议把它放在一个专门的空目录(我把它命名为`chat-example`)。

> 注：在我的仓库中，我命名为`04 Socket`，但是我把这个项目放在了01文件夹中，02...是对该项目的扩充。

```json
{
  "name": "socket-chat-example",
  "version": "0.0.1",
  "description": "my first socket.io app",
  "dependencies": {}
}
```

现在，为了便于安装我们所需要的依赖，我们会使用`npm install --save`：

```npm
npm install --save express@4.10.2
```

> 注：这里是直接指定了安装4.10.2版本的express，也可以不加版本号直接安装最新版本的express：`npm install --save express`。

现在express已经安装了，我们可以创建一个`index.js`文件来配置我们的应用程序。

```javascript
const app = require('express')();
const http = require('http').Server(app);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
```
这翻译为以下几步：

1. 将express初始化为可以用来提供给HTTP服务的处理函数:`app`(见第2行)。
2. 定义了一个路由处理程序，当访问我们的网站首页时调用。
3. 让http服务监听3000端口。

如果你运行`node index.js`，你会看到如下内容：

![](http://oef1ordmv.bkt.clouddn.com/LsMcTduUg.png)

当你的浏览器访问`http://localhost:3000`时：

![](http://oef1ordmv.bkt.clouddn.com/AOuGSHy7QM.png)

###访问HTML

到目前为止，我们是在`index.js`中调用了`res.send`并传递了一个HTML字符串。但如果把我们整个应用的HTML都放在这里，那会看起来十分混乱。因此，我们创建一个`index.html`文件并引入它。

让我们使用`sendFile`重构我们的路由处理程序：

```javascript
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
```
然后使用以下内容填充`index.html`：

```HTML
<!doctype html>
<html>
  <head>
    <title>Socket.IO chat</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font: 13px Helvetica, Arial; }
      form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
      form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
      form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
      #messages { list-style-type: none; margin: 0; padding: 0; }
      #messages li { padding: 5px 10px; }
      #messages li:nth-child(odd) { background: #eee; }
    </style>
  </head>
  <body>
    <ul id="messages"></ul>
    <form action="">
      <input id="m" autocomplete="off" /><button>Send</button>
    </form>
  </body>
</html>
```
如果你重新启动进程(通过点击 Control+C 并再次运行`node index`)然后刷新窗口就会看到如下页面：

![](http://oef1ordmv.bkt.clouddn.com/985FgSH2HQ.png)

### 整合Socket.IO

Socket.IO由两部分组成：

* 整合(或依托于)Node.js HTTP Server的服务器:`socket.io`
* 在浏览器端加载的客户端库:`socket.io-client`

在开发过程中，`socket.io`会自动为我们服务客户端，因此，现在我们只需要安装一个模块：

```npm
npm install --save socket.io
```

这会安装模块并添加依赖关系到`package.json`。现在，我们编辑`index.js`来添加：

```javascript
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('', (req, res) => {
  res.sendfile('index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
```

注意，我通过传递`http`(HTTP服务器)来初始化`socket.io`的一个新实例，然后监听连接sockets的`connection`事件，并将其记录到控制台。

现在在`index.html`中，`</body>`前添加以下代码段：

```HTML
<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io();
</script>
```

加载`socket.io-client`会暴露一个全局`io`并连接。

注意，当我调用`io()`时，没有指定任何URL，因为他默认尝试连接到提供页面的主机。

如果你现在重新加载服务器和网站，你会看到控制台打印`a user connected`。
尝试打开多个页面，你会看到以下消息：

![](http://oef1ordmv.bkt.clouddn.com/F5EBcTVDcd.png)

每个socket也会触发一个特殊的`disconnect`事件。

```javascript
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
```

然后如果你刷新页面几次，你就会看到：

![](http://oef1ordmv.bkt.clouddn.com/bOmy6xrJmi.png)

### Emitting事件

Socket.IO背后的主要思想是你可以接受和发送你想要的任何事件和里面的任何数据。任何可以编码为JSON的对象都可以，也支持[二进制数据](http://socket.io/blog/introducing-socket-io-1-0/#binary)。

当用户发送消息时，我们让服务端接收并作为一个`chat message`事件，`index.html`的`script`部分应如下所示：

```HTML
<script src="/socket.io/socket.io.js"></script>
<script src="http://code.jquery.com/jquery-1.11.1.js"></script>
<script>
  const socket = io();
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
</script>
```

同时在`index.js`中我们打印出来`chat message`事件:

```javascript
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log(`message: ${msg}`);
  });
});
```
运行结果应如下:

![](http://oef1ordmv.bkt.clouddn.com/a.gif)

### 广播

我们的下一个目标是从服务端向其它用户发送事件。

为了给每个人发送事件，Socket.IO给我们提供了`io.emit`:

```javascript
io.emit('some event', { for: 'everyone' });
```

如果你想向每个人发送一条不包含某个socket的消息，我们有`broadcast`标志：

```javascript
io.on('connection', (socket) => {
  socket.broadcast.emit('hi');
});
```

在这种情况下，为了简单起见，我们向包括发消息者在内的所有人发送消息：

```javascript
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
```

在客户端，当我们捕获`chat message`事件时我们会将其显示在页面中，所有客户端javascript代码如下：

```HTML
<script>
  const socket = io();
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', (msg) => {
    $('#messages').append($('<li>').text(msg));
  });
</script>
```

这样大约20行代码就完成了我们的聊天程序，看起来应该是下面这样：

![](http://oef1ordmv.bkt.clouddn.com/b.gif)

###　Homework

这里有一些改善应用程序的想法：

* 当有人连接或断开连接时，向连接的用户广播消息;
* 添加对昵称的支持;
* 不要想发送消息的人发送自己发送的消息。相反，只要他按`Enter`键，直接添加消息;
* 添加用户正在输入功能;
* 显示谁在线;
* 添加私人消息;
* 用数据库保存消息;
* 分享您的改进！

### 获取此示例

你可以在Github上找到：
[原版DEMO](https://github.com/rauchg/chat-example)
、[我的DEMO](https://github.com/zmyforever1/NodeDemo/tree/master/04%20Socket.IO)

原版DEMO的git地址：

```git
$ git clone https://github.com/guille/chat-example.git
```
