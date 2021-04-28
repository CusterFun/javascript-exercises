(function (Vue) { // 表示依赖了全局 Vue
  'use strict';

  const STORAGE_KEY = 'items-todo'
  // 进行本地存储，获取数据
  const itemStorage = {
    // 获取数据
    fetch() {
      // 获取出来的是 json 字符串，通过 parse 将字符串转换成数组对象
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    },
    // 保存数据
    save(items) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }
  // const 表示声明的变量是不可变的 ES6
  const items = [
    {
      id: 1, // 主键 id
      content: 'vue.js', // 输入的内容
      complete: false // 是否完成
    },
    {
      id: 2, // 主键 id
      content: 'go', // 输入的内容
      complete: false // 是否完成
    },
    {
      id: 3, // 主键 id
      content: 'rust', // 输入的内容
      complete: true // 是否完成
    },
  ];

  // 注册全局指令
  // 指令名不要加上 -v，在引用这个指令时才需要加上 v-
  Vue.directive('app-focus', {
    inserted(el, binding) {
      // 聚集元素
      el.focus();
    }
  });

  // Your starting point. Enjoy the ride!
  var app = new Vue({
    el: '#todoapp',
    data: {
      // items, //ES6, 这是对象属性的简写方式，等价于 items: items
      items: itemStorage.fetch(),
      currentItem: null, // 代表的是点击的那个任务项
      filterStatus: 'all' // 接收变化的状态值
    },
    // 定义函数
    methods: {
      addItem(event) { // ES6，等价于 addItem: function(event) {}
        console.log('111: ', event.target.value);
        // 1. 获取文本框中的内容
        const content = event.target.value.trim();
        // 2. 判断数据是否为空，如果为空，什么都不做
        if (!content.length) {
          return
        }
        // 3. 如果不为空，则添加到数组中
        const id = this.items.length + 1;
        this.items.push({
          id, // 主键 id
          content, // 输入的内容
          complete: false // 是否完成
        });
        // 4. 情况文本框的内容
        event.target.value = '';
      },
      // 移除任务项
      removeItem(index) {
        // 移除索引为 index 的一条数据
        this.items.splice(index, 1);
      },
      // 移除所有已完成的任务项
      removeCompleted() {
        // 过滤出所有未完成任务项，重新的将这个新数组（未完成任务项）赋值给 items 即可
        /* this.items.filter(item => {
          return !item.complete
        }); */
        this.items = this.items.filter(item => !item.complete);
      },
      // 进入编辑状态
      toEdit(item) {
        // 将点击的那个任务项 item，赋值给 currentItem，用于页面 .editing 样式
        this.currentItem = item;
      },
      // 取消编辑
      cancelEdit() {
        // 当 this.currentItem 值为空时，editing: item === currentItem 为 false
        this.currentItem = null;
      },
      // 完成编辑，保存数据
      finishEdit(item, index, event) {
        // 1. 获取当前输入框的值
        const content = event.target.value.trim();
        // 2. 判断输入框的值是否为空，如果为空，则进行删除任务项
        if (!content) {
          // 如果为空，则进行删除任务项
          this.removeItem(index);
          return;
        }
        // 3. 如果不为空，则添加到原有的任务项中，其实是做一个更新
        item.content = content;
        // 4. 移除 .editing 样式，退出编辑状态
        this.currentItem = null;
      }
    },
    // 定义计算属性
    computed: {
      // 剩余未完成任务数量
      remaining() { // remaining: function() {}
        // 数组 filter 函数过滤过所有未完成的任务项
        // unItems 用于接收过滤之后未完成的任务项，它是一个数组
        const unItems = this.items.filter(function (item) {
          return !item.complete;
        })
        return unItems.length;
      },
      // 双向绑定
      toggleAll: {
        // 当任务列表中的状态发生变化之后，就更新复选框的状态
        get() { // get: function() {}
          return this.remaining === 0;
        },
        // 当复选框的状态更新之后，则将任务列表中的状态更新
        set(newStatus) { // set: function() {}
          // 当点击复选框之后，复选框的值会发生改变，就会触发 set 方法调用
          // 将迭代出数组中的所有任务项，然后将当前复选框的状态值赋值给每一个任务的状态值
          this.items.forEach((item) => { // ES6 箭头函数 等价于 function(item){}
            item.complete = newStatus;
          });
        }
      },
      // 根据不同状态过滤出不同数据
      filterItems() { // 只使用 get 写 ()。如果既要使用 get 又要使用 set 使用对象形式
        // 当 filterStatus 状态发生变化时。则过滤出不同的数据
        // 判断 filterStatus 状态值
        switch (this.filterStatus) {
          case 'active':
            // 过滤出未完成的数据 filter
            return this.items.filter(item => !item.complete);
          case 'completed':
            // 过滤出所有已经完成的数据
            return this.items.filter(item => item.complete);
          default:
            // 当上面都不满足时，则返回所有数据
            return this.items;
        }
      }
    },
    // 自定义局部指令
    directives: {
      'todo-focus': { // 注意指令名称
        update(el, binding) {
          // 只有双击的那个元素才会获取焦点
          if (binding.value) {
            el.focus();
          }
        }
      }
    },
    // 定义监听器
    watch: {
      // 当对象中的某个属性发生改变之后，默认情况下不会被监听到
      // 如果希望修改对象属性之后，需要被监听
      /* items: function (newValue, old) {
        console.log('watch', newValue);
      } */
      // 深度监听，当对象中的属性值发生变化后，使用 deep:true 选择则可以实现监听
      items: {
        deep: true, // 深度监听对象中属性的变化
        handler: function (newItems, oldItems) {
          // 将数据保存到本地
          itemStorage.save(newItems);
        }
      }
    }
  });
  // 要写 Vue 实例外面
  // 当路由 hash 值发生变化之后，会自动调用该函数
  window.onhashchange = function () {
    // #/active  #/
    // 获取路由的 hash，当截取的 hash 值不为空时返回，为空则返回 'all'
    const hash = window.location.hash.substr(2) || 'all';
    // 状态一旦改变，就会将 hash 值赋值给 filterStatus
    // 定义一个计算属性 filterItems 来感知 filterStatus 的变化，当它变化之后，来过滤出不同的数据
    app.filterStatus = hash;
  }
  // 第一次访问页面时，就调用一次让状态值生效
  window.onhashchange();
})(Vue);

