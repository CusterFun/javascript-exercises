[1, 2, 3, 4, 5].forEach(i => {
  console.log(i);
});

// 监听消息
process.on('message', (message) => {
  console.log(message);
  // 发送消息
  process.send('welcome');
});