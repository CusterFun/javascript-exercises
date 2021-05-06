// module.exports = function () {
//     console.log('我是bar模块--Node')
// }

// ES6 注意 一个模块文件中，只能导出一个默认成员
// export default function() {
//     console.log('我是bar模块--ES6')
// }

export default {
  name: 'mengxuegu'
}

// export default 'hello'

// 导出非默认成员
// Node 导出非默认成员
// exports.x = 'xxxx'
// exports.y = 'yyyy'

// ES6 可以导出多个非默认成员
export const x = 'xxx'
export var y = 'yyy'

export function add(a, b) {
  return a + b
}

// export z = 'zzz' 错误的，没有数据类型
// export 'wwww' 错误的，没有变量名和类型
// export function (x, y) { 错误的，没有函数名
//     return x+y
// }