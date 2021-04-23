const net = require('net');

const server = net.createServer(function (socket) {
  console.log('client connected');
  console.log(socket);
});

server.listen(8080, () => {
  console.log('server is listening');
});

// 模拟客户端访问 windowns 使用 telenet，mac 和 Linux 使用 nc localhost 8080