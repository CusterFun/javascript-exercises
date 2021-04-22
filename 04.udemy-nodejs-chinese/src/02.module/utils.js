// 代码在 Node 内部会进行封装（模块包裹函数）
(function (exports, require, module, __filename, __dirname) {
  const add = function (a, b) {
    return a + b;
  }

  const sub = function (a, b) {
    return a - b;
  }
  module.exports = {
    thisAdd: add,
    thisSub: sub,
  };

  console.log(module);
  console.log(__filename);
  console.log(__dirname);
}) // IIF