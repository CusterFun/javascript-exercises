const net = require('net');

const client = new net.Socket();

client.connect(8888, 'localhost', () => {
  console.log('connected to the server');
});

client.on('data', (data) => {
  console.log('data: ' + data.toString());
});

// 首先启动服务器 node 07.socket.write.js
// 再启动客户端 node 10.client.on.js