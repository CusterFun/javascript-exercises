// 通过这种方式引入的 vue 模块，对应的是不是完整版（编译功能，运行功能）
// 它默认引入的 vue 模块中的 package.json 中 main 选项中引入的那个"main": "dist/vue.runtime.common.js"
// 而这个默认引入的是运行版，没有编译功能，所以会发出警告
// import Vue from 'vue'
// 解决：手动的引入指定的版本，下面引入的是完整版
// import Vue from 'vue/dist/vue.js'
// 方式2 ：采用 webpack 配置完整版 vue.js
import Vue from 'vue'


import App from './App.vue'
/*
new Vue({
    el: '#app',
    // template 实质上没有编译和渲染功能，而当前编译功能可以直接采用 vue-loader 进行编译，
    // 而渲染功能实质上是通过 render 函数 来进行渲染组件，所以只需要在此处指定 render 渲染组件即可
    // template: '<App />', // <App></App>
    // render: function (h) { // h 它是一个函数，这个函数用于要接收渲染的组件
    //     return h(App) // 函数的返回值就是渲染的结果
    // },
    // 如果采用 render 进行渲染，则 main.js 当中的 components 可以省略
    // components: {App}
    // 箭头函数 简写1
    // render: h => {
    //    return h(App)
    // }
    // 箭头函数 简写2
    render: h => h(App)

}) */
new Vue({
  render: h => h(App)
}).$mount('#app')