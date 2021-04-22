const EventEmitter = require('events').EventEmitter;

// 事件触发器
class StudyCourse extends EventEmitter {
  constructor() {
    super();

    setInterval(() => {
      this.emit('newlesson', {
        price: Math.random() * 100
      })
    }, 3000);
  }
}

// const study = new StudyCourse;
module.exports = new StudyCourse;

/*
EventEmitter 观察者模式
调用 vs 抛事件
  - 关键在于“不知道被通知者存在”
  - 以及“没有人听还能继续下去”
 */