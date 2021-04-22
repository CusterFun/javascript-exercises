const study = require('./lib');

// 事件监听器
study.addListener('newlesson', (res) => {
  if (res.price < 80) {
    console.log('buy!', res);
  }
});