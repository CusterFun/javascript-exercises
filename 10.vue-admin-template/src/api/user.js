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

// 通过用户id查询数据接口
export function getById(id) {
  return request({
    url: `/system/user/${id}`,
    method: 'get'
  })
}

// 用户数据更新
export function update(data) {
  return request({
    url: '/system/user',
    method: 'put',
    data
  })
}

// 根据 ID 删除用户
export function deleteById(id) {
  return request({
    url: `/system/user/${id}`,
    method: 'delete'
  })
}

// 查询用户拥有角色ids接口
export function getRoleIdsByUserId(id) {
  return request({
    url: `/system/user/${id}/role/ids`,
    method: 'get'
  })
}

// 提交用户角色数据
export function saveUserRole(id, roleIds) {
  return request({
    url: `/system/user/${id}/role/save`,
    method: 'post',
    data: roleIds
  })
}

// 提交修改新密码
export function updatePassword(data) {
  return request({
    url: `/system/user/password`,
    method: 'put',
    data: data
  })
}
