const net = require('net');

const server = net.createServer((socket) => {
  console.log('client connected');
});

server.listen(8888);

// 显示的针对 listening 事件
server.on('listening', () => {
  console.log('server is listening');
});