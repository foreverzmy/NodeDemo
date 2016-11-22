使用所有cpu创建服务器监听9000端口
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;
//主进程cluster.isMaster返回true，cluster.isWorker返回false;子进程则相反
if (cluster.isMaster) {
    console.log("master start...");

    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork(); //创建与主进程一样的子进程
    }

    cluster.on('listening', function(worker, address) { //当监听时的回调
        console.log('listening: worker ' + worker.process.pid + ', Address: ' + address.address + ":" + address.port);
    });

    cluster.on('exit', function(worker, code, signal) { //子进程死亡时的回调
        console.log('worker ' + worker.process.pid + ' died');
    });
} else {
    http.createServer(function(req, res) {
        res.writeHead(200);
        res.end("hello world\n");
    }).listen(9000);
}
