# express模块的使用

## 01.js：搭建简单express服务器

说明：一个简单的express是服务器，可以通过9000端口访问。

## 02.js：通过express加载HTML文件

说明：通过express加载HTML文件，通过9000端口访问。

## 03.js：使用模板引擎(jade)

说明：使用模板引擎可以更方便的编写HTML文件，而且可以更好地处理后台数据。


## 08.js：

说明：

* express应用生成器
通过应用生成器工具`express`可以快速创建一个应用的骨架。
```javascript
$ npm install express-generator -g
```
-h 选项可以列出所有可用的命令行选项：
```javascript
$ express -h
```

创建应用
```javascript
$ express myapp
```

安装所有依赖包：
```javascript
$ cd myapp
$ npm install
```

启动应用
```javascript
$ DEBUG=myapp npm start //MacOS/Linux
set DEBUG=myapp & npm start //Windows
```
