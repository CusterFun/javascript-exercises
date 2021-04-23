const EventEmitter = require('events');
const emitter = new EventEmitter();

// 只要有新的监听器对该事件进行了注册，newListener 就会被触发
emitter.once('newListener', (event, listener) => {
  if (event === 'myEvent') {
    emitter.on('myEvent', () => {
      console.log('hello');
    });
  }
});

emitter.on('myEvent', () => {
  console.log('world');
});

emitter.emit('myEvent');