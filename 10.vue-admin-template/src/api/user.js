import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

// 用户条件分页列表数据
export function getList(query, current = 1, size = 20) {
  return request({
    url: '/system/user/search',
    method: 'post',
    data: { ...query, current, size }
  })
}

// 新增用户
export function add(data) {
  return request({
    url: '/system/user',
    method: 'post',
    data
  })
}
