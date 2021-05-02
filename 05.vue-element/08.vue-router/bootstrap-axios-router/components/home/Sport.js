; (function () {
  const template = `
  <!--体育栏目-->
  <div>
    <ul>
      <li v-for="(sport, index) in sportArr" :key="sport.id">
        <!-- <a href="#">{{sport.title}}</a>
          注意，to 中是 JS 表达式，就需要使用 v-bind 绑定 to 属性，即 :to
          注意单引号不要少了
        -->
        <router-link :to="'/news/sport/detail/' + sport.id">{{sport.title}}</router-link>
      </li>
    </ul>
    <!-- 详情 渲染出 SportDetail 组件 -->
    <router-view></router-view>
  </div>`
  window.Sport = {
    template,
    data() {
      return {
        sportArr: []
      }
    },
    // 异步获取数据
    created() {
      this.getSportArr()
    },
    methods: {
      getSportArr() {
        axios.get('http://127.0.0.1:5500/05.vue-element/08.vue-router/bootstrap-axios-router/db/sport.json').then(response => {
          console.log(response.data, this);
          this.sportArr = response.data;
        }).catch(err => {
          alert(err.message);
        })
      }
    }
  }
})()