const os = require('os');
const cluster = require('cluster');

if (cluster.isMaster) {
  for (let i = 0; i < os.cpus().length/2; i++) {
    cluster.fork();
  }
} else {
  require('./app');
}