// 类类型接口，一个接口可以约束类成员有哪些属性，以及他们的类型
interface Human { // Human 接口
  // new(name:string):void // 接口也不能约束类的构造函数
  name: string; // name 属性
  eat(): void; // eat 方法
}

// Asian 类实现了接口，必须实现接口中定义的所有属性
class Asian implements Human {
  constructor(name: string) {
    this.name = name;
  }
  name: string;
  eat() { } // 必须实现接口中定义的所有属性，否则报错缺少方法的定义

  sleep() { } // 类可以定义自己的属性

  // 接口只能约束类的公有成员
  // 接口也不能约束类的构造函数
}

// 接口的继承 接口可以像类一样相互继承，并且一个接口可以继承多个接口
interface Man extends Human {
  run(): void
}

interface Child {
  Cry(): void
}

// 继承多个接口
interface Boy extends Man, Child {}

// 定义对象符合 Boy 接口的定义
let boy: Boy = {
  name: '',
  run() {},
  eat() {},
  Cry() {}
}
// 从接口的继承可以看出接口的继承可抽离出可重用的接口，也可以将多个接口合并成一个接口

// 用接口来继承类 - 相当于接口把类的成员都抽象了出来，也就是只有类的成员结构，而没有具体的实现
class Auto {
  state = 1
  // private state2 = 0 // 接口在抽离类的成员时，不仅抽离了公共成员，而且抽离了私有成员和受保护成员
}

// 接口来继承 Auto 类
interface AutoInterface extends Auto {
  // 这个接口中就隐含了 state 属性
}
// 要想实现 AutoInterface 接口，只要一个类的成员有 state 属性就可以了。
class C implements AutoInterface {
  state = 1
}
// Auto 的子类也可以实现 AutoInterface 接口
class Bus extends Auto implements AutoInterface {
  // 在这个子类中就不必实现 state 属性了，因为子类继承了父类的属性
}
// 注意：接口在抽离类的成员时，不仅抽离了公共成员，而且抽离了私有成员和受保护成员


