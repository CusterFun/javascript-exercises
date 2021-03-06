const Mock = require('mockjs');

const data = Mock.mock({
  //定义数据生成规则
  'memberList|2-6': [
    {
      'id|+1': 2, // 自增长1 ，初始值为2，
      'name|1-3': '小梦', // 随机生成1到3个重叠小梦  'name|2': '小梦'  生成2个小梦
      'phone|11': '8', // 88888888888
      'age|1-120': 1, // 随机生成 1-120之间数字
      'salary|6000-8000.1-3': 1, // 随机生成 6000到8000之间的数字 ，并且小数部分是1到3位
      'status|1': true, // 随机生成true或false, 并且都是 1/2 概率
      'open|2-4': false, // 生成的概率， true 4/(2+4) false 2/(2+4)
      'order|2': { id: 1, name: '订单1', price: 999 }, // 在对象中随机抽取2个属性进行返回
      'order2|2-3': { id: 1, name: '订单1', price: 999 }, // 在对象中随机抽取2个或3个属性进行返回
      'idCard': /\d{15}|\d{18}/ // 指定正则表达式，当前生成身份证号，注意： 不要用单引号引起来。
    }
  ]
});

console.log(JSON.stringify(data, null, 2));