const os = require('os');
const cluster = require('cluster');

if (cluster.isMaster) {
  // for (let i = 0; i < os.cpus().length / 2; i++)
  for (let i = 0; i < 1; i++) {
    const worker = cluster.fork();
    let missedPing = 0;
    let inter = setInterval(() => {
      console.log('ping');
      worker.send('ping'); // 每隔3秒向子进程发送心跳
      missedPing++;

      if (missedPing >= 3) {
        clearInterval(inter);
        process.kill(worker.process.pid); // 丢失3次心跳，退出
      }
    }, 300);
    worker.on('message', (msg) => {
      console.log('pong');
      if (msg === 'pong') {
        missedPing--;
      }
    });
  }

  // 间隔5秒复活一个挂了的进程
  cluster.on('exit', () => {
    setTimeout(() => {
      cluster.fork();
    }, 5000);
  });
} else {
  require('./app');
  process.on('message', (str) => {
    if (str === 'ping') {
      process.send('pong');
    }
  })
  // 当进程出现会崩溃的错误
  process.on('uncaughtException', (err) => {
    // 未捕获的错误信息进行上报
    console.err(err);
    process.exit(1); //进程退出
  });

  // 内存使用超过 700，判断为有内存泄漏，自杀
  setInterval(() => {
    console.log(process.memoryUsage().rss);
    if (process.memoryUsage().rss > 734003200) {
      console.log('oom'); // 上报
      process.exit(1);
    }
  }, 5000);
}