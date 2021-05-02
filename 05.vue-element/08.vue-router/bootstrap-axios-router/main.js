new Vue({
  el: '#app',
  router, // 引用路由配置
  // Vue 实例中的 template 选项中引用了组件后，会将这个组件的渲染结果替换掉 #app 标签的元素
  template: '<app/>',  // template: '<app> </app>',
  components: {
    App // 等价于 App: App
  }
})