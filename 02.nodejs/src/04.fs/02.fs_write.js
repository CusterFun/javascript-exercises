const fs = require('fs');

fs.writeFile('mytest.txt', 'hello, mytest, node.js', function (error) {
  if (error) {
    console.log('write file error');
  } else {
    console.log('write file successful');
  }
})

fs.writeFile('mytest2.txt', 'mytest2, node.js\r\n', {flag: 'a'}, function (error) {
  if (error) {
    console.log('write file error');
  } else {
    console.log('write file successful');
  }
})