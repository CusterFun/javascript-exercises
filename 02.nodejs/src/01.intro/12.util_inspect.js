const util = require('util');

// 对象转换成字符串
const obj = {
  name: 'zhangsan',
  address: 'shanghai',
  age: 5,
  married: false,
  getAge: function () {
    return this.age;
  }
}

const str = util.inspect(obj, {
  'colors': true
});

console.log(str);