const path = require('path');

const extInfo = path.extname(path.join(__dirname, 'myDir', 'hello.js'));

// 获取文件扩展名，返回为空或扩展名
console.log(extInfo);