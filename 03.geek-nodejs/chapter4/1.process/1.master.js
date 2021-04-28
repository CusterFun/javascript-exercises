const cp = require('child_process');

const child_process = cp.fork(__dirname + '/1.child.js');

child_process.send('haha');

