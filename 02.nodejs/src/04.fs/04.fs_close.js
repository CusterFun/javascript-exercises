const fs = require('fs');

fs.open('test.txt', 'r+', function (err, fd) {
  if (err) {
    return console.error(err);
  }
  console.log('file is open');

  // 打开的回调里面嵌入了关闭文件的回调
  fs.close(fd, function (err) {
    if (err) {
      console.log(err);
    }
    console.log('file is closed');
  });
})