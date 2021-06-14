https://gitee.com/geektime-geekbang/typescript-in-action

## 编写第一个 TypeScript

全局安装 `TypeScript`

```bash
npm i typescript -g
```

这样就可以在命令行使用 `tsc` 创建配置项

```bash
tsc --init
```

新建 `ts` 文件 `src/index.ts`

```tsx
let hello: string = 'Hello TypeScript'
```

使用 `tsc` 命令编译 `ts` 文件

```bash
tsc ./src/index.ts
```

编译生成了 `index.js` 文件

```js
var hello = 'Hello TypeScript';
```

安装 `webpack`

```bash
npm i webpack webpack-cli webpack-dev-server -D
```

安装 `ts-loader` 和本地安装 `typescript`

```bash
npm i ts-loader typescript -D
```

安装插件 `html-webpack-plugin` 和 `clean-webpack-plugin`

```bash
npm i html-webpack-plugin clean-webpack-plugin webpack-merge -D
```

新建 `build` 目录，存放配置文件

`webpack.config.js` 配置文件入口

```js
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const devConfig = require('./webpack.dev.config')
const proConfig = require('./webpack.pro.config')

module.exports = (env, argv) => {
    let config = argv.mode === 'development' ? devConfig : proConfig;
    return merge(baseConfig, config);
};
```

`webpack.base.config.js` 公共配置文件

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'app.js'
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                use: [{
                    loader: 'ts-loader'
                }],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/tpl/index.html'
        })
    ]
}
```

`webpack.dev.config.js` 开发配置文件

```js
const webpack = require('webpack');
module.exports = {
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                devtools: 'cheap-module-eval-source-map'
            }
        })
    ]
}
```

`webpack.pro.config.js` 生产配置文件

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    plugins: [
        new CleanWebpackPlugin()
    ]
}
```

在 src 目录下新建模板文件夹 tpl 和 index.html 文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TypeScript in Action</title>
</head>
<body>
  <div class="app"></div>
</body>
</html>
```

更改 `package.json` 文件

```json
{
  "name": "01.ts-in-action",
  "version": "1.0.0",
  "description": "",
  "main": "./src/index.js",
  "scripts": {
    "start": "webpack serve --mode development --env development --config ./build/webpack.config.js",
    "build": "webpack --mode=production --config ./build/webpack.config.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "clean-webpack-plugin": "^4.0.0-alpha.0",
    "html-webpack-plugin": "^5.3.1",
    "ts-loader": "^9.2.3",
    "typescript": "^4.3.2",
    "webpack": "^5.38.1",
    "webpack-cli": "^4.7.2",
    "webpack-dev-server": "^3.11.2",
    "webpack-merge": "^5.8.0"
  }
}
```

运行 `npm start` 启动

```bash
npm start
```

修改 `src/index.ts` 文件

```tsx
let hello: string = 'Hello TypeScript'
document.querySelectorAll('.app')[0].innerHTML = hello;
```

访问页面可以看到效果

## 基本类型

| ES6的数据类型 | Typescript的数据类型              |
| ------------- | --------------------------------- |
| Boolean       | Boolean             - void        |
| Number        | Number             - any          |
| String        | String                  - never   |
| Array         | Array                   - 元组    |
| Function      | Function             - 枚举       |
| Obiect        | Obiect                 - 高级类型 |
| Symbol        | Symbol                            |
| undefined     | undefined                         |
| null          | null                              |

### 类型注解

作用:相当于强类型语言中的类型声明

语法:(变量/函数):type

在 `src` 目录下新建 `datatype.ts` 文件，然后在 `index.ts` 中引用进来

```ts
import './datatype'

let hello: string = 'Hello TypeScript'
document.querySelectorAll('.app')[0].innerHTML = hello;
```

### 示例

```tsx
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
```

## 枚举类型

枚举:一组有名字的常量集合

```tsx
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
```

思维方法：

>  在程序中不容易记忆的硬编码，或者未来可能改变的常量，抽取出来，定义成枚举类型。提高程序的可读性和可维护性。

## 对象类型接口

接口可以用来约束对象、函数以及类的结构和类型，这是一种代码协作的契约，必须遵守，而且不能改变。

```tsx
interface List {
  readonly id: number; // 只读属性
  name: string;
  age?: number; // 可选属性
}

interface Result {
  data: List[]
}

function render(result: Result) {
  result.data.forEach((value) => {
    console.log(value.id, value.name);
    if (value.age) {
      console.log(value.age);
    }
    // value.id++ // 只读属性不能被修改
  })
}

let result = {
  data: [
    {id: 1, name: 'A', sex: 'male' },
    {id: 2, name: 'B' }
  ]
}

render(result)

// 传入的对象满足接口的必要条件就可以被允许，多余的字段也可以通过类型检查

// 如果直接传入对象字面量，ts 就会对额外的字段做类型检查
// render({
//   data: [
//     {id: 1, name: 'A', sex: 'male' },
//     {id: 2, name: 'B' }
//   ]
// })

// 绕过检查的方法有三种
// 第一种：上面的方式，把对象字面量赋值给一个变量
// 第二种：使用类型断言
render({
  data: [
    {id: 1, name: 'A', sex: 'male' },
    {id: 2, name: 'B' }
  ]
} as Result) // 明确告诉编译器，接收到的类型就是 Result 类型
// 从而绕过类型检查
render(<Result>{
  data: [
    {id: 1, name: 'A', sex: 'male' },
    {id: 2, name: 'B' }
  ]
}) // 该写法强烈不建议使用，在 react 中会造成歧义

// 第三种：使用字符串索引签名 - 不确定一个接口中多多少属性
// interface List {
//   id: number;
//   name: string;
//   [x: string]: any; // 用任意字符串索引x，可以得到任意的结果
// }

// 用户数字索引接口
interface StringArray {
  [index: number]: string // 用任意数字去索引 StringArray 都会得到 string,相当于声明了一个字符串类型的数组
}

let chars: StringArray = ['A', 'B']

// 用字符串索引一个接口
interface Names {
  [x: string]: string // 用任意字符串索引 Names 都会得到 string
  // y: Number,
  [z: number]: string // 数字索引的返回值一定要是 字符串索引返回值类型的子类型，因为 JavaScript 会进行类型转换
}
```

## 函数类型的接口

```tsx
// 用变量定义函数类型
let addFun: (x: number, y: number) => number

// 用接口定义函数
interface Add {
  // 不需要函数名称，直接定义参数类型和返回值
  (x: number, y: number) : number
}

// 使用类型别名定义函数
type AddFunc = (x: number, y: number) => number

// 实现具体的函数
let addFunc: AddFunc = (a, b) => a + b

// 混合类型接口 - 即可定义函数，又可以像对象一样拥有属性或者方法
interface Lib {
  (): void;
  version: string;
  doSomething(): void;
}

// 实现混合类型接口
function getLib() {
  let lib: Lib = (() =>{}) as Lib
  lib.version = '1.0'
  lib.doSomething = () => {}
  return lib;
}

let lib1 = getLib();
lib1();
lib1.doSomething();
let lib2 = getLib(); // 再创建一个实例
```

上面用接口定义了对象和函数，接口还可以定义类的结构和类型

## 函数相关知识点梳理

```tsx
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
```

## 类1：继承和成员修饰符

类的基本实现

```tsx
// 为成员属性添加了类型注解
class Dog {
  // 构造函数参数添加了类型注解，构造函数返回值会自动推断为类的本身
  constructor(name: string) {
    this.name = name;
  }
  name: string;
  // ts 中实例的属性必须要有初始值，或者在 constructor 中被初始化
  // name?: string = 'dog'; // 也可以声明为可选的属性
  run() {} // 默认返回值是 void
}

// 类成员的属性都是实例属性，而不是原型属性
// 类成员的方法都是实例方法

console.log(Dog.prototype); // 类的原型是不包括属性

// 创建类的实例
let dog = new Dog('wangwang')
console.log(dog); // name 属性就在实例上，而不在原型上
```

类的继承

```tsx
// 类的继承使用 extends 关键字
class Husky extends Dog {
  constructor(name: string, color: string) {
    // 派生类的构造函数必须包含"super"调用
    super(name); // 表示父类的实例
    this.color = color // this 一定要在 super 之后调用
  }
  // 子类添加自己的属性
  color: string // 同样需要在构造函数中初始化或有初始值
}
```

类的成员添加修饰符

```tsx
// 为成员属性添加了类型注解
class Dog {
  // 构造函数参数添加了类型注解，构造函数返回值会自动推断为类的本身
  /* private */ /* protected */ constructor(name: string) {
    this.name = name;
  }
  public name: string;
  // ts 中实例的属性必须要有初始值，或者在 constructor 中被初始化
  // name?: string = 'dog'; // 也可以声明为可选的属性
  run() {} // 默认返回值是 void

  private pri() {} // 私有成员

  protected pro() {} // 受保护成员 只能在类或者子类中访问，而不能在类的实例中访问

  readonly legs: number = 4; // 成员声明为只读
}

// 类成员的属性都是实例属性，而不是原型属性
// 类成员的方法都是实例方法

console.log(Dog.prototype); // 类的原型是不包括属性

// 创建类的实例
let dog = new Dog('wangwang')
console.log(dog); // name 属性就在实例上，而不在原型上
// dog.pri() // 在类的实例中不能调用类的私有成员
// dog.pro() //属性"pro"受保护，只能在类“Dog” 及其子类中访问

// 类的继承使用 extends 关键字
class Husky extends Dog {
  constructor(name: string, color: string) {
    // 派生类的构造函数必须包含"super"调用
    super(name); // 表示父类的实例
    this.color = color // this 一定要在 super 之后调用
    // this.pri() // 在子类中也不能调用类的私有成员
    this.pro()
  }
  // 子类添加自己的属性
  color: string // 同样需要在构造函数中初始化或有初始值
}

// 类的成员修饰符
// 类的所有属性默认都是 public，也可以显示的声明
// 类的私有成员只能在类的本身调用，而不能被类的实例调用，也不能被子类调用
// 在构造函数中也可以添加私有成员属性，代表这个类即不能被实例化，也不能被继承
// 受保护成员 只能在类或者子类中访问，而不能在类的实例中访问
// 构造函数受保护，只能被继承，不能实例化，表示声明了一个基类 protected constructor
```

除了类的成员可以添加修饰符外，构造函数的参数也可以添加修饰符，作用是将参数自动变成实例的属性，这样就可以省略在类中定义。代码会更加简洁一些

```tsx
// 类的继承使用 extends 关键字
class Husky extends Dog {
  constructor(name: string, public color: string) {
    // 派生类的构造函数必须包含"super"调用
    super(name); // 表示父类的实例
    this.color = color // this 一定要在 super 之后调用
    // this.pri() // 在子类中也不能调用类的私有成员
    this.pro()
  }
  // 子类添加自己的属性
  // color: string // 同样需要在构造函数中初始化或有初始值
  // 在构造函数的参数添加修饰符，就可以自动将参数变成类的实例属性
}
```

static 修饰符，表示类的静态成员只能通过类名来调用，而不能通过子类来调用

```tsx
// 为成员属性添加了类型注解
class Dog {
  // 构造函数参数添加了类型注解，构造函数返回值会自动推断为类的本身
  /* private */ /* protected */ constructor(name: string) {
    this.name = name;
  }
  public name: string;
  // ts 中实例的属性必须要有初始值，或者在 constructor 中被初始化
  // name?: string = 'dog'; // 也可以声明为可选的属性
  run() {} // 默认返回值是 void

  private pri() {} // 私有成员

  protected pro() {} // 受保护成员 只能在类或者子类中访问，而不能在类的实例中访问

  readonly legs: number = 4; // 成员声明为只读

  static food: string = 'bones' // 类的静态成员只能通过类名来调用，而不能通过子类来调用
}

// 类成员的属性都是实例属性，而不是原型属性
// 类成员的方法都是实例方法

console.log(Dog.prototype); // 类的原型是不包括属性

// 创建类的实例
let dog = new Dog('wangwang')
console.log(dog); // name 属性就在实例上，而不在原型上
// dog.pri() // 在类的实例中不能调用类的私有成员
// dog.pro() //属性"pro"受保护，只能在类“Dog” 及其子类中访问
console.log(Dog.food, /* dog.food */);


// 类的继承使用 extends 关键字
class Husky extends Dog {
  constructor(name: string, public color: string) {
    // 派生类的构造函数必须包含"super"调用
    super(name); // 表示父类的实例
    this.color = color // this 一定要在 super 之后调用
    // this.pri() // 在子类中也不能调用类的私有成员
    this.pro()
  }
  // 子类添加自己的属性
  // color: string // 同样需要在构造函数中初始化或有初始值
  // 在构造函数的参数添加修饰符，就可以自动将参数变成类的实例属性
}

// 类的成员修饰符
// 类的所有属性默认都是 public，也可以显示的声明
// 类的私有成员只能在类的本身调用，而不能被类的实例调用，也不能被子类调用
// 在构造函数中也可以添加私有成员属性，代表这个类即不能被实例化，也不能被继承
// 受保护成员 只能在类或者子类中访问，而不能在类的实例中访问
// 构造函数受保护，只能被继承，不能实例化，表示声明了一个基类 protected constructor

console.log(Husky.food); // 类的静态成员也能被继承
```

## 类2：抽象类与多态

es 中并没有引入抽象类的概念，ts 对 es 的扩展，所谓抽象类就是只能被继承，不能被实例化的类。 

```tsx
// 抽象类使用 abstract 关键字
abstract class Animal {
  // 在抽象类中定义方法，可以有具体的实现，这样子类就不用实现了，就实现了方法的复用
  eat() {
    console.log('eat');
  }
  // 在抽象类中也可以不指定方法的具体实现，这就构成了抽象方法
  abstract sleep(): any // 抽象方法的好处是，明确知道子类可以有其他的实现，没有必要在父类中实现
}

// let animal = new Animal(); // 无法创建抽象类的实例，只能被继承


// 使用 DogClass 继承 Animal
class DogClss extends Animal {
  constructor(name: string){
    super()
    this.name  = name;
  }
  name:string
  run() {}
  sleep() {
    console.log('dog sleep');
  }
}

let dogClass = new DogClss('wangwang');

// 在子类中调用抽象类的方法
dogClass.eat()

// 抽象类可以抽离出事务的共性，有利于代码的复用和扩展，抽象类也可以实现多态。
// 多态：在父类中定义抽象方法，在多个子类中，对这个方法有不同的实现，在程序运行时，会根据不同的对象，执行不同的操作，这样就实现了运行时的绑定
class Cat extends Animal {
  sleep() {
    console.log('Cat sleep');
  }
}
let cat = new Cat();

let animals: Animal[] = [dogClass, cat];

animals.forEach(i=>{
  // 在程序执行时，在这里会判断具体的实例是哪一种实例，然后执行不同的方法，这样就实现了多态
  i.sleep()
})

// ts 中特殊的类型 this
// 类的成员方法可以直接返回 this，这样就可以很方便的实现链式调用
class WorkFlow {
  step1() {
    return this
  }
  step2() {
    return this
  }
}
// 实例化的对象可以链式调用
new WorkFlow().step1().step2()
// 在继承时this类型也可以表现出多态（this 既可以指父类型，也可以指子类型）
class Myflow extends WorkFlow {
  next() {
    return this
  }
}
new Myflow().next().step1().next().step2()
```

