; (function () {
  const template = `
  <!--科技栏目-->
  <div>
    <ul >
      <li v-for="tech in techArr" :key="tech.id">
        <span> {{ tech.title }} </span>
        <button @click="pushTech(tech.id)" class="btn  btn-default btn-xs">查看(Push)</button>&nbsp;
        <button @click="replaceTech(tech.id)" class="btn btn-default btn-xs">查看(replace)</button>
      </li>
      <button @click="$router.back()">后退</button>
      <button @click="$router.go(-1)">后退1步</button>
      <button @click="$router.go(1)">前进1步</button>

    </ul>
    <!--详情-->
    <router-view></router-view>
  </div>
  `
  window.Tech = {
    template,
    data() {
      return {
        techArr: []
      }
    },
    created() {
      this.getTechArr()
    },
    methods: {
      getTechArr() {
        axios.get('http://127.0.0.1:5500/05.vue-element/08.vue-router/bootstrap-axios-router/db/tech.json').then(response => {
          this.techArr = response.data;
        }).catch(err => {
          alert(err.message);
        })
      },
      pushTech(id) {
        // push 可后退回来
        this.$router.push(`/news/tech/detail/${id}`);
      },
      replaceTech(id) {
        // replace 不可后退回来
        this.$router.replace(`/news/tech/detail/${id}`);
      },
    }
  }
})()