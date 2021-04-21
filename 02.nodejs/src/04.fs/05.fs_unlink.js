const fs = require('fs');

// 在回调的流程里倾向于使用箭头函数，而不推荐回调函数
fs.unlink('hello.txt', (err) => {
  if (err) throw err;

  console.log("success");
});