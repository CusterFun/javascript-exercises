const fs = require('fs');

// 重命名文件
fs.rename('hello.txt', 'world.txt', (err) => {
  if (err) throw err;

  // 文件统计信息
  fs.stat('world.txt', (err, stats) => {
    if (err) throw err;
    console.log(JSON.stringify(stats));
  });
});