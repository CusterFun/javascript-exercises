; (function () {
  const template = `<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">

    <!--右边上半区域-->
    <!-- <h1 class="page-header">Dashboard</h1> -->
        <!-- 定义插槽 -->
        <slot name="dashboard"></slot>
        <!-- 通过属性绑定的方式向子组件传递数据
              @自定义事件名=事件监听函数
              在子组件 dashboard 中触发了 delete_hobby 事件来调用 deleteHobby 函数 -->
        <dashboard :hobbies="hobbies" @delete_hobby="deleteHobby"></dashboard>
    <!--右边下半区域-->
        <h2 class="sub-header">Section title</h2>
        <home-list :empList="empList" :deleteEmp="deleteEmp"></home-list>
      </div>`

  window.AppHome = {
    template, // template: template,
    components: { //Dashboard 作为AppHome 的子组件
      Dashboard, // Dashboard: Dashboard
      HomeList // HomeList:HomeList
    },
    data() {
      return {
        hobbies: ['写代码', '睡觉', '打豆豆', '看书'],
        empList: [ // alt + shift 可以同时操作多行
          // { id: 1, name: '小梦', salary: 8000 },
          // { id: 2, name: '小欣', salary: 15000 },
          // { id: 3, name: '小温', salary: 6000 },
          // { id: 4, name: '小非', salary: 7000 },
          // { id: 5, name: '小波', salary: 10000 },
          // { id: 6, name: '小超', salary: 5000 },
          // { id: 7, name: '小伟', salary: 6000 },
        ]
      }
    },
    methods: {
      // 删除某个员工
      // 因为删除 emp 会对 empList 做更新操作
      // 而这个 empList 初始化在当前组件中，所以删除的函数需要定义在这个组件里面
      deleteEmp(index) {
        this.empList.splice(index, 1);
      },
      deleteHobby(index) {
        this.hobbies.splice(index, 1);
        // 删除之后，发布消息，导航组件（左侧）来统计已删除的总数量
        PubSub.publish('changeNum', 1); // 上面删除的是 1 条
      }
    },
    // 发送异步请求
    created() {
      // 回调函数需要使用箭头函数（this Vue实例），不然 this 代表 window
      axios.get('http://127.0.0.1:5500/05.vue-element/07.vue-lifecycle-ajax/bootstrap-axios/emp.json')
        .then(response => {// function (response) {
          // handle success
          console.log(response.data, this);
          this.empList = response.data
        })
        .catch(error => {//function (error) {
          // handle error
          alert(error.message);
        })
        .finally(() => {//function () {
          // always executed
          console.log('finally');
        });
    },
  }
})()