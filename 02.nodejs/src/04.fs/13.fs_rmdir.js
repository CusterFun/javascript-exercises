const fs = require('fs');

// fs.rmdir('mydir', (err) => {
//   if (err) throw err;
//   console.log('success');
// })

/*
只能删除空的文件夹，非空或不存在都会报错
[Error: ENOTEMPTY: directory not empty, rmdir 'mydir']
递归删除当前目录即当前目录的子目录
npm view rmrf
 */

// 递归删除，使用参数 递归 删除
// 删除失败不会出错
fs.rmdir('mydir', {recursive: true}, (err) => {
  if (err) throw err;
  console.log('success');
})