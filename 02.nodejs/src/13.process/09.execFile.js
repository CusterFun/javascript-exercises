const childProcess = require('child_process');

childProcess.execFile('node', ['10.addFunction'], (err, stdout, stderr) => {
  if (err) throw err;
  else console.log(stdout.toString());
});