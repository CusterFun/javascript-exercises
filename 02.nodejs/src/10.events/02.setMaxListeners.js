const http = require('http');
const events = require('events');
const httpServer = http.createServer();

// 设置允许最大的事件监听数量
httpServer.setMaxListeners(2);

httpServer.on('request', (request, response) => {
  if (request.url === '/') {
    console.log('addListener');
    response.end('end');
  }
});

const listener = (request, response) => {
  if (request === '/') {
    console.log('hello world');
    response.end('end');
  }
};

const listener2 = (request, response) => {
  if (request === '/') {
    console.log('hello world');
    response.end('end');
  }
};

const listener3 = (request, response) => {
  if (request === '/') {
    console.log('hello world');
    response.end('end');
  }
};

console.log('default max listener count: ' + events.EventEmitter.defaultMaxListeners);

httpServer.on('request', listener);
httpServer.on('request', listener2);
httpServer.on('request', listener3);

httpServer.listen(3000, () => {
  console.log('listening to port 3000');
});