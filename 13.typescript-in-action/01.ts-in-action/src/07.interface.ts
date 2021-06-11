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
