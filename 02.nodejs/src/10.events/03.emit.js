const http = require('http');
const httpServer = http.createServer();

httpServer.on('request', (request, response) => {
  if (request.url === '/') {
    console.log('addListener');
    response.end('end');
  }
});

httpServer.listen(3000, () => {
  console.log('listening to port 3000');
});

// 先监听，再发射
httpServer.on('serverEvent', (param1, param2, param3) => {
  console.log(param1 + ',' + param2 + ',' + param3);
});

// 发射事件
httpServer.emit('serverEvent', 'hello', 'world', 'welcome');

