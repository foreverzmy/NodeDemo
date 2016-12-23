# config-lite模块

在做项目时，将配置与代码分离都是一种非常好的做法。通常将配置写到一个配置文件里，如config.js/config.json等，并放到项目的根目录下。

config-lite模块会根据环境变量的不同加载不同的配置文件而无须修改任何代码。
默认加载当前进程所在目录下的config目录，如果程序`NODE_ENV=test node app`启动，则则会依次降级查找config/test.js、config/test.json、config/test.node加载。

