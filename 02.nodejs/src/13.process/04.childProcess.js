const childProcess = require('child_process');

const nodeChildProcess = childProcess.spawn('node', ['03.childProcess']);

nodeChildProcess.stdout.on('data', (data) => {
  console.log(data.toString());
  console.log(`child process id: ${nodeChildProcess.pid}`);
});

nodeChildProcess.on('exit', (code, signal) => {
  console.log(code);
})