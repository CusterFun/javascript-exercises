import { getUserMenuButtonList } from '@/api/user'
import { PcCookie, Key } from '@/utils/cookie'

// 定义状态
const state = {
  init: false, // 是否已加载用户权限信息
  menuList: [], // 用户所拥有的菜单权限
  buttonList: [] // 用户所有用的按钮权限
}

// 改变状态值
const mutations = {
  SET_SYSTEM_MENU: (state, data) => {
    state.init = true // 已经加载用户权限
    state.menuList = data.menuTreeList // 注意：后台返回的字段名
    state.buttonList = data.buttonList
  }
}

// 定义行为
const actions = {
  // 获取用户菜单和按钮权限
  GetUserMenu({ commit }) {
    return new Promise((resolve, reject) => {
      // 获取用户 ID
      const userId = PcCookie.get(Key.userInfoKey) ? JSON.parse(PcCookie.get(Key.userInfoKey)).uid : null
      // 发送请求获取权限信息
      if (userId) {
        getUserMenuButtonList(userId).then(response => {
          // 获取到数据, 将菜单和按钮数据保存到 vuex 状态
          commit('SET_SYSTEM_MENU', response.data)
          resolve() // 正常响应钩子
        }).catch(err => reject(err))
      }
    })
  }
}

export default {
  namespaced: true, // 引用需要制定模块名 /menu/GetUserMenu
  state,
  mutations,
  actions
}
