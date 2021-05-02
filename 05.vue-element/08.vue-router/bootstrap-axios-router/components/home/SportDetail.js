; (function () {
  const template = `
  <!--详情-->
  <div class="jumbotron">
    <h1>{{ id }}</h1>
    <h2>{{ sportDetail.title }}</h2>
    <p>{{ sportDetail.content }}</p>
  </div>
  `

  window.SportDetail = {
    template,
    data() { // data 只会初始化一次，后面点击之后不会进行重新赋值
      return {
        id: null,
        sportDetail: {}
      }
    },
    created() {
      // 第一次初始化组件时，要调用函数进行获取 id 并查找数据
      this.getRportById();
    },
    methods: {
      getRportById() {
        // 1. 获取路由地址中的 id 值, -0 把 id 从字符串转为 数字
        this.id = this.$route.params.id - 0;// 字符串变为数字 减一个 0 即可。

        // 2. 获取所有的体育新闻
        axios.get('http://127.0.0.1:5500/05.vue-element/08.vue-router/bootstrap-axios-router/db/sport.json').then(response => {
          const sportArr = response.data;
          // 3. 通过 id 获取指定的数据
          // find 返回满足条件的 1 条数据
          /* this.sportDetail = sportArr.find(function (detail) { // 这是错误的代码
            // this 如果要代码当前组件对象，则回调函数要使用箭头函数
            return detail.id === this.id;
          }); */
          this.sportDetail = sportArr.find(detail => {
            // this 如果要代码当前组件对象，则回调函数要使用箭头函数
            return detail.id === this.id;
          });
        }).catch(err => {
          alert(err.message);
        });
      }
    },
    watch: { // watch 是对象，用于监听属性使用
      '$route': function () {
        this.getRportById();
      }
    }
  }
})()