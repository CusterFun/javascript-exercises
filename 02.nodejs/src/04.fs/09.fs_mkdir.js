const fs = require('fs');

// fs.mkdir('mydir', (err) => {
//   if (err) throw err;
//   console.log('success');
// });

/*
已经存在再创建会报错
[Error: EEXIST: file already exists, mkdir 'mydir']
 */

// 推荐使用如下方法，重复创建不会出错
fs.mkdir('mydir/hello/world', {recursive: true}, (err) => {
  if (err) throw err;
  console.log('success');
});