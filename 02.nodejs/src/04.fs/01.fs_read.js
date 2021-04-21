/*
  Node 操纵文件系统是通过一个重要的原生模块来实现的：fs
  对于 fs 中的绝大多数 api 来说，Node 都提供了相同功能的两个版本：同步版本与异步版本
  对于同步版本与一步版本来说，其在方法的命名上存在一个规则：
  xxxx（异步）
  xxxxSync（同步）
  尽最大可能去使用异步版本
 */
const fs = require('fs');

// 异步读取文件
fs.readFile('test.txt', 'utf8', function (error, data) {
  if (error) {
    console.log(error);
    console.log('error occurred');
  } else {
    console.log(data);
  }
});

// 同步读取文件
try {
  const data = fs.readFileSync('test.txt', 'utf8');
  console.log(data);
} catch (e) {
  console.log(e);
}
