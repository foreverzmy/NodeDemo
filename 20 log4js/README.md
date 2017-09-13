const log4js = require('log4js');
const logger = log4js.getLogger();
logger.debug("Time:", new Date());/08/21/nodejs-lesson-1-log4js/?utm_source=gold_browser_extension)

log4js 是 Node.js 日志处理中的数一数二的模块。比起console或者 TJ 的 debug 有其优势，尤其针对投入生产的 Node.js 项目来说下面这些是不可少的：

* 日志分级
* 日志分类
* 日志落盘

## 01.js：log4js简单用法

调用 .getLogger() 可以获得 log4js 的 Logger 实例，这个实例的用法与 console 是一致的，可以调用.debug（也有 .info、.error 等方法）来输出日志。

## 02.js：日志分类

在通过 getLogger 获取 Logger 实例时，唯一可以传的一个参数就是 loggerCategory（如 'example'），通过这个参数来指定 Logger 实例属于哪个类别。这与 TJ 的 debug 是一样的：

## 03：Appender日志输出

通过log4js.configure来设置我们想要的appender，将日志输出到了文件中。
## 04：日志过滤

我们可以调整 appender 的配置，对日志的级别和类别进行过滤。

## 05：日志格式

Layout 是 log4js 提供的高级功能，通过 layout 我们可以自定义每一条输出日志的格式。log4js 内置了四中类型的格式：

* messagePassThrough：仅仅输出日志的内容；
* basic：在日志的内容前面会加上时间、日志的级别和类别，通常日志的默认 layout；
* colored/coloured：在 basic 的基础上给日志加上颜色，appender Console 默认使用的就是这个 layout；
* pattern：这是一种特殊类型，可以通过它来定义任何你想要的格式。

`%r %p $m $n`是 log4js 内置的包含说明符，可以借此来输出一些`meta`的信息，更多细节，可以参考 log4js 的[文档](https://github.com/nomiddlename/log4js-node/wiki/Layouts)。

## 06：实战

* 配置了一个 appender，从日志中选出类别为 access 的日志，输出到一个滚动的文件中；
* `log4js.getLogger('access')` 获取一个类别为 access 的 Logger 实例，传递给 `log4js.connectLogger` 中间件，这个中间件收集访问信息，通过这个实例打出。

