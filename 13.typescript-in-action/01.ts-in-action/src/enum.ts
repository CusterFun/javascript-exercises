// 数字枚举 默认取值从 0 开始
enum Role {
  Reporter = 1, // 也可以自定义枚举值，后面的值递增
  Developer,
  MainTainer,
  Owner,
  Guest
}
console.log(Role.Reporter);
console.log(Role); // 枚举实现原理是反向映射，枚举的value和key都作为了key和value
/**
 * {
 *    1: "Reporter",
 *    2: "Developer",
 *    3: "MainTainer",
 *    4: "Owner",
 *    5: "Guest",
 *    Reporter: 1,
 *    Developer: 2,
 *    MainTainer: 3,
 *    Owner: 4,
 *    Guest: 5
 * }
 */


// 字符串枚举,不能做反向映射
enum Message {
  Success = '恭喜你，成功了',
  Fail = '抱歉，失败了'
}

// 异构枚举，数字枚举和字符串枚举混用，不建议使用
enum Answer {
  N,
  Y = 'Yes'
}

// 枚举成员
// Role.Reporter = 2 // 枚举成员的值是只读的，不能被修改
enum Char {
  // 常量枚举，在编译时计算出结果，以常量的形式出现在运行时环境
  a, // 没有初始值的常量枚举
  b = Char.a, // 对已有枚举成员的引用的常量枚举
  c = 1 + 3, // 常量表达式的常量枚举

  // computed 需要被计算的枚举成员
  d = Math.random(), // 非常量的表达式
  e = '123'.length // 不会在编译阶段进行计算，会被保留到程序执行阶段
  // f // 枚举成员名称的后面必须跟有初始值
}

// 常量枚举 - 会在编译后被移除-作用在不需要对象，而需要对象的值的时候
const enum Month {
  Jan,
  Feb,
  Mar
}
// 在编译时就会被值替代
let month = [Month.Jan, Month.Feb, Month.Mar]

// 枚举类型 - 枚举和枚举成员单独作为类型存在
enum E { a, b } // 枚举成员没有任何初始值
enum F { a = 0, b = 1 } // 所有成员都是数字枚举
enum G { a= 'apple', b = 'banana' } // 所有成员都是字符串枚举

let e: E = 3
let f: F = 3
// e === f // 不同类型的枚举不能进行比较

let e1: E.a = 1// 定义了三种枚举成员类型
let e2: E.b
// e1 === e2 // 不同类型不能进行比较
let e3: E.a = 1
e1 === e3 // 相同类型可以进行比较

let g1: G // 字符串枚举取值只能是枚举成员的类型
let g2: G.a
