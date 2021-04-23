/*
事件的注册机制，响应机制，回调机制等等，都完全遵从于观察者模式这种设计思想。
 */
const http = require('http');

const httpServer = http.createServer();

// Alias for emitter.on(eventName, listener).
httpServer.addListener('request', (request, response) => {
  if (request.url === '/') {
    console.log('on');
    response.end('end');
  }
});

// 针对同一个事件，为其添加不止一个监听器，当事件被触发的时候，
// 注册到这个事件上的所有监听器都会被执行，并且按照他们注册的顺序去执行的
// 针对一个事件只响应一次，用 once
// httpServer.once('request', (request, response) => {
//   if (request.url === '/') {
//     console.log('once');
//     response.end('end2');
//   }
// });

const listener = (request, response) => {
  if (request.url === '/') {
    console.log('hello world');
    response.end('welcome');
  }
};

// 箭头函数的引用作为参数传递
httpServer.on('request', listener);
// 注意这里是需要指明移除的是哪个事件的哪个监听器
httpServer.removeListener('request', listener);
// httpServer.off('request', listener); // off removeListener 别名
// httpServer.removeAllListeners('request'); // 删除【指定事件的】所有监听器

httpServer.listen(3000, () => {
  console.log('listening to port 3000');
});