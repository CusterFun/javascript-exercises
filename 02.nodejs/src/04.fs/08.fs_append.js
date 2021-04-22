const fs = require('fs');

// 推荐使用
fs.appendFile('info.txt', 'my hello world', 'utf8', (err) => {
  if (err) throw  err;
  console.log('success');
});

/*
fs.writeFile('mytest2.txt', 'mytest2, node.js\r\n', {flag: 'a'}, function (error) {
  if (error) {
    console.log('write file error');
  } else {
    console.log('write file successful');
  }
})
 */