require('@babel/register'); // 在 node 中使用 es6 语法
const cluster = require('cluster');

// 简单的进程守护
if (cluster.isMaster) {
  for (let i = 0; i < require('os').cpus().length / 2; i++) {
    createWorker();
  }

  // 间隔 5秒 复活一个挂了的进程
  cluster.on('exit', () => {
    setTimeout(() => {
      createWorker();
    }, 5000);
  });
} else {
  // 当子进程出现会崩溃的错误
  process.on('uncaughtException', function (err) {
    console.log(err); // 未捕获的错误信息进行上报
    process.exit(1); // 退出进程
  });

  // 回应心跳信息
  process.on('message', (msg) => {
    if (msg == 'ping#' + process.pid) {
      process.send('pong#' + process.pid);
    }
  });

  // 检测内存溢出, 内存使用超过 700 M, 判断为内存泄漏
  setInterval(() => {
    if (process.memoryUsage().rss > 734003200) {
      console.log('oom'); // 上报
      process.exit(1);
    }
  }, 5000);

  require('./app');
}

function createWorker() {
  // 创建子进程并进行心跳监控
  const worker = cluster.fork();

  let missed = 0; // 心跳检测没有回应的 ping 次数

  // 心跳
  let timer = setInterval(() => {
    // 三次没有回应心跳，杀死该进程
    if (missed >= 3) {
      clearInterval(timer);
      console.log(worker.process.pid + ' has become a zombie!');
      process.kill(worker.process.pid);
      return;
    }
    missed++;// 开始心跳
    worker.send('ping#' + worker.process.pid);
  }, 10000);

  worker.on('message', (msg) => {
    // 确认心跳回应
    if (msg == 'pong#' + worker.process.pid) {
      missed--;
    }
  });
  // 挂了就没有必要再进行心跳了
  worker.on('exit', function () {
    clearInterval(timer);
  });
}