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

