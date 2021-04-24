const childProcess = require('child_process');

const forkProcess = childProcess.fork('./06.forEach', {silent: true});

// 监听消息
forkProcess.on('message', (message) => {
  console.log(message);
});

// 发送消息
forkProcess.send('hello world');

/*
fork 是 spawn 的特化，只能生成 node 的子进程，没有回调
可以使用 on 的相关事件 和 send 方法进行进程间通信 （IPC）
 */