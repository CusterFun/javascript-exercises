const cluster = require('cluster');
const http = require('http');
const os = require('os');

const cpuCount = os.cpus().length;

// cluster.schedulingPolicy = cluster.SCHED_RR;
/*
  Master - Worker 模式
 */
if (cluster.isMaster) {
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork(); // 每个fork子进程都会执行该文件
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(worker.process.pid);
  })
} else {
  // 子进程都会执行如下代码
  const httpServer = http.createServer((request, response) => {
    let data = '';

    request.on('data', (chunk) => {
      data += chunk;
    });

    request.on('end', () => {
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.end(`${process.pid}`);
    });
  });

  httpServer.listen(3000, () => {
    console.log('listening to port 3000');
  });
}

/*
查看端口情况
lsof -i -P -n | grep 3000
可以查看到主进程的 pid，基于 pid 查看
ps -ef | grep 6458
可以查看到包含主进程和子进程的信息

cluster.schedulingPolicy 调度策略

 */