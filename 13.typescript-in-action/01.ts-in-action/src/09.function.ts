 // 函数定义的四种方式
function add1(x:number, y:number) {
  return x + y;
}

let add2: (x:number, y:number) => number // 用变量定义函数类型

type add3 = (x:number, y: number) => number // 使用类型别名定义函数类型

interface add4 { // 用接口定义函数类型
  (x: number, y: number): number
}

// 后三种都是函数类型的定义，没有具体的实现，真正调用的时候要写函数体
// 对函数参数的要求，在 ts 中，形参和实参要一一对应
// 可选参数
function add5(x:number, y?:number /* , z:number  可选参数必须位于必选参数之后*/) {
  return y ? x + y : x
}

add5(1)

// 为参数提供默认值
function add6(x:number, y = 0, z:number, g = 1) {
  return x + y + z + g
}
// 在必选参数前，默认参数是不能省略的，必须明确传入 undefined 来获取它的默认值
console.log(add6(1, undefined, 3))

// 当参数个数不固定，就可以使用剩余参数,剩余参数类型是以数组形式存在
function add7(x:number, ...rest: number[]) {
  return x + rest.reduce((pre, cur) => pre + cur)
}
console.log(add7(1,2,3,4,5));

// 函数重载 - 如果两个函数名称相同，参数个数或类型不同，就实现了函数重载
// 函数重载好处是不需要为相似功能的函数，选用不同的函数名称，这样增强了可读性
// ts 的函数重载要求先定义一系列相同的函数声明
function add8(...rest: number[]): number;
function add8(...rest: string[]): string;
function add8(...rest: any[]): any { // 在类型最宽泛的版本中实现重载
  let first = rest[0]; // 判断第一个函数类型
  if (typeof first === 'string') {
    return rest.join('')
  }
  if (typeof first === 'number') {
    return rest.reduce((pre,cur)=> pre+cur) // 使用数组的reduce方法
  }
}

console.log(add8(1,2,3,4));
console.log(add8('a','b','c'));


