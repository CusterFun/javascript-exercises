// 定义了一个泛型类，同样把泛型变量放在类的名称后面，就可以约束所有类的成员
// 需要注意的是，泛型不能应用于类的静态成员
class LogGenerics<T> {
  /* static */ run(value: T) { // 静态成员不能引用类型参数
    console.log(value);
    return value;
  }
}

let logG1 = new LogGenerics<number>();
logG1.run(1);
let logG2 = new LogGenerics(); // 不传入类型参数
logG2.run('a');

// 泛型约束
// 先预定义接口,接口有 length 属性
interface Length {
  length: number;
}
// 然后让类型T继承Length接口,表示T受到了一定约束，不再是任意类型都可以传了。输入的参数不管是什么类型，都必须要要有length属性。
function logGenericsBound<T extends Length>(value: T): T {
  console.log(value, value.length); // 打印参数和参数属性
  return value;
}
logGenericsBound([1]);
logGenericsBound('123');
logGenericsBound({length: 1})
