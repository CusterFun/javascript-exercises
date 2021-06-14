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