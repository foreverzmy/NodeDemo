//通过消息传递来监控工作进程状态
var cluster = require('cluster'),
    http = require('http'),
    numCPUS = require('os').cpus().length;

var rssWarn = (12 * 1024 * 1024),
    heapWarn = (10 * 1024 * 1024);

if (cluster.isMaster) { //主进程
    for (var i = 0; i < numCPUS; i++) {
        let worker = cluster.fork(); //创建子进程
        worker.on('message', function(m) { //接收子进程信息时的回调
            if (m.memory) {
                if (m.memory.rss > rssWarn) {
                    console.log(`Worker ${m.process} using too much memory!`);
                }
            }
        })
    }
} else {
    http.Server(function(req, res) { //创建http服务器监听9000端口
        res.writeHead(200);
        res.end('hello world!\n')
    }).listen(9000)
    setInterval(function() { //每秒向父进程报告一次状态
        process.send({ memory: process.memoryUsage(), process: process.pid });
    }, 1000)
}
