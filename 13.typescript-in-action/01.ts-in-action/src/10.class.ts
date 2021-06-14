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
