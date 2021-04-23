const net = require('net');

const client = new net.Socket();

client.connect(8888, 'localhost', () => {
  console.log('connected to the server');
  client.write('message from client');
});

// 客户端监听服务端发送的 data
client.on('data', (data) => {
  console.log('data from server: ' + data.toString());
  client.write('hello world');
});

client.on('end', () => {
  console.log('end event');
});