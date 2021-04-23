const http = require('http');
const io = require('socket.io');
const fs = require('fs');

// http server
const server = http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/html'});
  if (request.url === '/') {
    fs.readFile('./client.html', 'utf8', (err, data) => {
      if (err) {
        console.log('error occurred');
        return;
      } else {
        response.end(data.toString());
      }
    });
  } else {
    response.end('<html><body>404</body></html>');
  }
});

server.listen(3000, 'localhost');

// http server 包装转成 WebSocket 服务
const socket = io(server);

socket.on('connection', (socket) => {
  console.log('connected has been established');

  socket.on('message', (message) => {
    console.log('message: ' + message);
  });

  socket.on('disconnect', (message) => {
    console.log('connection has lost');
  });

  // 自定义事件 serverEvent 自定义事件名
  socket.emit('serverEvent', 'this is serverEvent');

  // 服务端响应事件
  socket.on('clientEvent', (data) => {
    console.log(data.address + ', ' + data.age);
  });

  // 事件的广播 socket.broadcast
  socket.on('broadcastEventClient', (message) => {
    console.log(message);
    socket.broadcast.emit('broadcastEventServer', 'you are good!')
  });

  socket.send('hello client!');
})
