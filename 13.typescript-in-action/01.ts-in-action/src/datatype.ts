// 原始类型
let bool: boolean = true
let num: number = 123
let str: string = 'abc'
// str = 123

// 数组
let arr1: number[] = [1, 2, 3]
let arr2: Array<number> = [1, 2, 3, /* '4' */]
let arr3: Array<number|string> = [1, 2, 3, '4'] // 联合类型

// 元组
let tuple: [number, string] = [0, '1']
// tuple.push(2) // 先元组添加新元素
// console.log(tuple); // [0, "1", 2]
// tuple[2] 可以先元组添加新元素，但也不能越界访问，强烈不建议使用 push

// 函数
// let add = (x, y) => x + y // 参数 x 隐式具有 any 类型
let add = (x: number, y: number): number => x + y // 通常返回
let compute: (x: number, y: number) => number
compute = (a, b) => a + b

// 对象
let obj: object = {x: 1, y: 2}
// obj.x = 3 // 类型"object"上不存在属性"x"
let obje: {x: number, y: number} = {x: 3, y: 4}
obje.x = 1

// symbol 具有唯一的值
let s1: symbol = Symbol()
let s2 = Symbol()
console.log(s1 === s2); // false

// undefined, null
// let un: undefined = 1 // 定义了 undefined 就不能被赋值为其他类型
let un: undefined = undefined // 只能被赋值为 undefined
let nu: null = null
// num = undefined // 同样的不能将 undefined 赋值给其他类型
// num = null // 同样的不能将 null 赋值给其他类型
// 在 tsconfig.json 中将 "strictNullChecks": false

// void 没有任何返回值的类型
let noReturn = () => {} // 没有任何返回值的函数就是 void 类型
console.log(void 0); // void 0 返回的是 undefined


// any
let x // 不指定变量类型，默认就是 any 类型
x = 1 // 整型
x = [] // 数组
x = () => {} // 函数

// never 永远不会有返回值的类型
let error = () => {
  throw new Error('error') // 抛出异常，就永远没有返回值
}
let endless = () => {
  while(true) {} // 死循环函数 
}