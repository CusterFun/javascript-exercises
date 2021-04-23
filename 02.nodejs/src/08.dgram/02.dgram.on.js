const dgram = require('dgram');

const message = Buffer.from('This message comes from client');
const socket = dgram.createSocket('udp4');

// 客户端向服务端发送数据
socket.send(message, 0, message.length, 9999, 'localhost', (err, bytes) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('client has sent ' + bytes + ' bytes message');
});

// 客户端监听逻辑
socket.on('message', (msg, info) => {
  const message2Send = 'hello world';
  socket.send(message2Send, 0, message2Send.length, 9999, 'localhost');
})