(function (Vue) { // 表示依赖了全局 Vue
  'use strict';

  // const 表示声明的变量是不可变的 ES6
  const items = [
    {
      id: 1, // 逐渐 id
      content: 'vue.js', // 输入的内容
      complete: false // 是否完成
    },
    {
      id: 1, // 逐渐 id
      content: 'go', // 输入的内容
      complete: false // 是否完成
    },
    {
      id: 3, // 逐渐 id
      content: 'rust', // 输入的内容
      complete: true // 是否完成
    },
  ];

  // Your starting point. Enjoy the ride!
  new Vue({
    el: '#todoapp',
    data: {
      items //ES6, 这是对象属性的简写方式，等价于 items: items
    },
  })

})(Vue);
