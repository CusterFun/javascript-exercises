// Node 导入
// var bar = require('./bar')
// bar()

// Es6 导入默认成员
// import bar from './bar'
// // bar()
// // console.log(bar.name)
// console.log(bar)

// Es6 导入非默认成员
// 通过 解构赋值 的方式 来加载成员
// x 对应的是 bar.js 模块中的 x 成员 ，y 对应 y 成员，add 对应 add 成员 函数
// import {x, y, add} from './bar'
// console.log(x, y, add(10, 20))

// 通过解构赋值按需导入你需要的成员 
import { x, y } from './bar'
console.log(x, y)

// 会将默认成员 与 非默认成员 全部导入
import * as bar2 from './bar'
console.log(bar2, bar2.x, bar2.y, bar2.add(1, 2))