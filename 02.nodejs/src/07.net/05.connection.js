const net = require('net');

const server = net.createServer((socket) => {
  console.log('client connected');

  server.maxConnections = 2;

  server.getConnections((err, count) => {
    console.log('client count: ', count)
  });
});

server.listen(8888, () => {
  console.log('server is listening');
});