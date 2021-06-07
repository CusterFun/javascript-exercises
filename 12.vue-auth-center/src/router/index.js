import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history', // 开启历史路由，路由上没有hash值 #
  routes: [
    {
      path: '/',
      component: () => import('@/components/layout'),
      children: [
        {
          path: '',
          component: () => import('@/views/auth/login')
        }
      ]
    },
    // 刷新组件路由配置 +++++
    {
      path: '/refresh',
      component: () => import('@/components/layout'),
      children: [
        {
          path: '',
          component: () => import('@/views/auth/refresh')
        }
      ]
    }
  ]
})

// 导入vuex状态对象store
import store from '@/store'

// 路由拦截器, 每次路由跳转都会通过这个拦截器
router.beforeEach((to, from, next) => {
  if (to.path === '/logout') {
    // 退出 to.query === this.$route
    store.dispatch('UserLogout', to.query.redirectURL)
  } else {
    next()
  }
})

export default router
