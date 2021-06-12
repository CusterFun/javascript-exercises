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