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

