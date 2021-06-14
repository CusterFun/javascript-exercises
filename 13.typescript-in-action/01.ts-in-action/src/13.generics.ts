// 一个打印函数
function log1(value: string): string {
  console.log(value);
  return value;
}

// 函数重载
function log2(value: string): string;
function log2(value: string[]): string[];
function log2(value: any) {
  console.log(value);
  return value;
}

// 联合类型
function log3(value: string | string[]): string | string[] {
  console.log(value);
  return value;
}

// any 类型 - 丢失了类型信息，类型之间的约束关系，它忽略了输入参数类型和函数的返回值类型必须是一致的。
function log(value: any) {
  console.log(value);
  return value;
}

// 泛型：不预先确定的数据类型，具体的类型在使用的时候才能确定
// 1. 类型T不需要预先的指定，相当于andy类型。2. 可以保证输入参数和函数返回值类型是一致的
function logGen<T>(value: T): T {
  console.log(value);
  return value;
}
// 两种调用方式,一种在调用时直接指明类型
logGen<string[]>(['a', 'b'])
// 另一种调用方式是：使用ts的类型推断省略类型参数
logGen(['a', 'b'])

// 泛型不仅能定义一个函数，还能定义一个函数类型
// 使用类型别名定义一个泛型函数类型
type Log = <T>(value: T) => T // 去掉了函数名称
let myLog: Log = log // 具体的实现可以定义为 log 函数

// 泛型用在接口中
interface LogInterface<T /* = string */> { // 接口的所有成员都受到泛型变量约束
  (value: T): T // 泛型约束一个函数
}

// 实现时必须指定一个类型
let myLogIntface: LogInterface<number> = log
myLogIntface(1)