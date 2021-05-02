; (function () {
  const template = `<div class="col-sm-3 col-md-2 sidebar">
  <ul class="nav nav-sidebar">
    <!-- <li class="active"> -->
    <!--
      1. router-link 默认渲染出来的是 a 标签，如果需要让它渲染出来的是别的标签，
      则可以使用 tag 属性指定渲染后的标签。

      2. 可以在每个 router-link 上使用 active-class 来激活 CSS 类名
      或者在 VueRouter 实例中，使用 linkActiveClass 全局配置 CSS 类名

      3. exact 精确匹配路由
    -->
      <router-link to="/" exact tag="li" active-class="active"><a>首页</a></router-link>
    <!-- </li> -->
    <router-link to="/news" tag="li"><a>新闻管理</a></router-link>
    <router-link to="/about" tag="li"><a>关于我们</a></router-link>
  </ul>
</div>`;

  window.AppLeaf = {
    template,
    data() {
      return {
        delNum: 0 // 已经删除 的总数量
      }
    },
    created() {
      // 订阅消息
      PubSub.subscribe('changeNum', (event, num) => { // 使用 this，应该箭头函数
        // 事件回调处理
        // 统计已经删除的总数量
        this.delNum = this.delNum + num;
      })
    },
  }

})()