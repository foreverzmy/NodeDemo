//重启被阻塞的僵尸进程
var cluster = require('cluster'),
    http = require('http'),
    numCPUS = require('os').cpus().length;

var rssWarn = (50 * 1024 * 1024),
    heapWarn = (50 * 1024 * 1024);

var workers = {};

if (cluster.isMaster) { //主进程
    for (var i = 0; i < numCPUS; i++) {
        creatWorker() 
    }
    setInterval(function() {
        var time = new Date().getTime();
        for (id in workers) {
            if (workers.hasOwnProperty(id) && workers[id].lastCb + 5000 < time) {
                console.log(`Long running worker ${id} killed`);
                workers[id].worker.kill();
                delete workers[id];
                creatWorker()
            }
        }
    }, 1000)
} else {
    http.Server(function(req, res) { //创建http服务器监听9000端口
        if (Math.floor(Math.random() * 200) === 4) {
            console.log(`Stopped ${process.pid} from ever finnishing`);;
            while (true) {
                continue;
            }
        }
        res.writeHead(200);
        res.end(`hello world from ${process.pid}!\n`)
    }).listen(9000);
    setInterval(function() { //每秒向父进程报告一次状态
        process.send({ cmd: 'reportMem', memory: process.memoryUsage(), process: process.pid });
    }, 1000)
}

function creatWorker() {
    var worker = cluster.fork(); //创建子进程
    console.log(`Create worker ${worker.id}`)
    workers[worker.id] = { worker: worker, lastCb: new Date().getTime() - 1000 }
    worker.on('message', function(m) { //接收子进程信息时的回调
        if (m.cmd === 'reportMem') {
            workers[id].lastCb = new Date().getTime();
            if (m.memory.rss > rssWarn) {
                console.log(`Worker ${m.process} using too much memory!`);
            }
        }
    })
}
