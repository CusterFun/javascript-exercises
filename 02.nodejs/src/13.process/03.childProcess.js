const childProcess = require('child_process');

const lsChildProcess = childProcess.spawn('ls', ['-al', './']);

lsChildProcess.stdout.on('data', (data) => {
  console.log(data.toString());
  console.log(`child process id: ${lsChildProcess.pid}`);
});

lsChildProcess.on('exit', (code, signal) => {
  console.log(code);
});

/*
主进程可以开启很多的子进程
而子进程可以执行它特有的相关执行任务
当任务执行完毕之后，通过相应的事件方式，把执行结果返回给主进程
 */