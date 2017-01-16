# process对象

process是一个Node中的全局对象，包含当前进程的相关信息，不如传给它的参数和当前设定的环境变量

process对象提供一系列属性，用于返回系统信息。

* process.pid：当前进程的进程号。
* process.version：Node的版本，比如v0.10.18。
* process.platform：当前系统平台，比如Linux。
* process.title：默认值为“node”，可以自定义该值。
* process.argv：当前进程的命令行参数数组。
* process.env：指向当前shell的环境变量，比如process.env.HOME。
* process.execPath：运行当前进程的可执行文件的绝对路径。
* process.stdout：指向标准输出。
* process.stdin：指向标准输入。
* process.stderr：指向标准错误。

process对象提供以下方法：

* process.exit()：退出当前进程。
* process.cwd()：返回运行当前脚本的工作目录的路径。_
* process.chdir()：改变工作目录。
* process.nextTick()：将一个回调函数放在下次事件循环的顶部。

## 01.js：在node退出前调用代码。

说明：此代码会在node退出循环前调用，时间循环在exit事件之后就不会再运行了，因此只有那些不需要回调的代码会被执行，这里的`setTimeout()`里的代码就不会被执行。

## 02.js：通过uncaughtException事假捕获异常

说明：在Node中，时间主循环里碰到的异常会导致Node进程退出。uncaughtException事件提供了一个极其暴力的方法来捕获这些异常。
uncaughtException是一个简单的智能处理程序，只能简答的把异常输出到标准输出，记录下这些错误。但是，因为它捕获的是一个不存在的函数触发事件，所以虽然Node程序不会退出，但是标准的执行流程会被打断。所以Node.js文档中明确指出，使用这个时间时应该在回调中包含`process.exit()`；否则会让程序处于不确定的状态中，这很糟糕。


## 03.js：设置和获取环境变量

环境变量对于改变程序或模块的工作方式很有帮助。比如用这些变量配置服务器，指定它监听的端口。或者操作设定TMPDIR变量指定程序应该把临时文件输出到哪个目录并在后面清理它们。

假如你想在开发或调试模块时启用调试模式的日志输出，但在常规使用时不用，因为那样用户会觉得很烦。用环境变量可以很好地解决这个问题。

>设置环境变量
>* win:set DEBUG=1;
>* linux:export DEBUG=1

## 04.js：获取命令参数

 `process.argv`会获取终端输入的命令并生成一个数组。数组中第一个是node程序地址，第二个是脚本文件地址，往后就是输入的命令参数。

 例如：

 ```javascript
 $ node 04.js hello world 
 //['.../node.exe','...\\NodeDemo\\08 process\\04','hello','world']
 ```

## 05：制作命令行工具

Node还可以作为命令行开发工具。结合上面的获取命令参数的例子可以做出一个命令行控制下的No的工具。

Node作为命令行工具需要在普通的Node程序上多三个步骤。

* 在项目文件头部添加一行`#! /usr/bin/env node`，这被称为shebang，表示用后面的路径所示的程序来执行当前文件。
* 在`package.json`文件中添加一个`bin`属性。
```json
"bin":{"command":"index.js"}
```
* 最后在当前目录执行`npm link`就可以了。你就可以直接运行`command ...`来执行项目了。你也可以直接发布到`npm`上，然后全局安装使用。

## 06.js：控制台请求网页

可以通过`process.argv`从控制台向程序传一个网页的地址，然后通过`stdout`输出流将网页显示在控制台。

## 07.js：控制台输入输出

本程序中要求用户在控制台中输入一个数字并要大于18才能进入项目。
`process.stdout`用来控制标准输出，也就是在命令行窗口向用户显示内容。它的`write`方法等同于`console.log`。
通过stdin从控制台读取数据，但是必须调用`process.stdin.resume()`表明脚本需要从`stdin`中读取数据。之后，stdin就会像其他可读流一样，在收到另外一个进程的输出，或用户在终端窗口中按键时发出data事件。 

## 08：子进程实现非最优斐波那契数列

Node提供了child_process模块，在Node服务器或脚本内创建子进程。
`cp.fork()`——用内置的IPC通道繁衍额外Node进程的特殊办法。 
服务器用cp.fork()把斐波那契的计算逻辑放在一个单独的Node进程中，它会用process.send()向父进程返回报告。

