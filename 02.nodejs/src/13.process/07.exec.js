const childProcess = require('child_process');

childProcess.exec('node 08.forEach', (err, stdout, stderr) => {
  if (err) throw err;
  else console.log(stdout.toString());
});


/*
exec 是带回调的启动子进程的函数
 */