# 单元测试

单元测试时自动化测试中的一种，时针对程序模块来进行正确性检验的测试工作。程序单元是应用的最小的可测试部件。

单元测试有许多风格，常见的风格有：
* TDD(测试驱动开发):所有功能是否被正确实现
* BDD(行为驱动开发):系统最终的实现是否与用户最终的期望一致

## mocha

mocha是流行的Node.js测试框架，同时支持TDD、BDD和exports风格的测试，并且支持许多优秀的断言库，支持异步和同步的测试、支持多种方式导出结果，同时支持浏览器端的测试。

win需全局安装mocha：

```npm
npm i -g mocha
```
ubuntu下需用apt安装mocha

```linux
sudo apt install mocha
```

常用的有`describe()`和`it()`：

* describe(moduleName,testDetail):用来描述一组测试的目的或功能，可以嵌套,moduleName随意取名。
* it(info,func):用来描述测试的期望值，一个`describe`可以有多个`it`，一个`it`至少有一个断言。info是文字说明，当测试错误时会打印出来。

## 01:assert断言

* assert.equal(exp1,exp2):断言判断exp1结果是否等于exp2，这里采取的是`==`而不是`===`。

## 02:Asyncchronous：异步代码调试

在回调最深处传done，然后加`done()`表示结束。`done`表示从此处开始，一层层回调回去。

一个it里面只能调用一次`done()`，所以多个异步测试应该用多个`it`。