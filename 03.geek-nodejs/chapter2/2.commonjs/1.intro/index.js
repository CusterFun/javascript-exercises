console.log('start require');
var lib = require('./lib');
console.log('结果: ', lib)
console.log('end require');
console.log(lib.add);

// 在模块外也可以改变模块内，是同一个引用
lib.additional = 'test';

// 查看 module.exports 和 exports 可以使用 webpack 工具
// webpack --devtool none --mode development --target node graphql.js