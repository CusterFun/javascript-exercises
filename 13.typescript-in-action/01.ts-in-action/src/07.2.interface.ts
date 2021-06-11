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