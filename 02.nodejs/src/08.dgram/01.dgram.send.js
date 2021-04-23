const dgram = require('dgram');

const message = Buffer.from('This message comes from server');

// UDP 服务器端创建 Socket 对象
const socket = dgram.createSocket('udp4', (msg, info) => {
  // 向客户端发送消息
  socket.send(message, 0, message.length, info.port, info.address, (err, bytes) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Server has sent ' + bytes + ' bytes message');
  });
});

socket.bind(9999, 'localhost', () => {
  console.log('Server has bind to 9999');
});

// 监听 message 事件
socket.on('message', (msg, info) => {
  console.log('message event occurred');
  console.log(msg.toString());
})
