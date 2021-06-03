import request from '@/utils/request'

export default {
  // 角色条件分页查询
  getList(query, current = 1, size = 20) {
    return request({
      url: `/system/role/search`,
      method: 'post',
      data: { ...query, current, size }
    })
  },
  // 新增角色
  add(data) {
    return request({
      url: `/system/role`,
      method: 'post',
      data
    })
  },
  // 通过角色ID查询数据接口
  getById(id) {
    return request({
      url: `/system/role/${id}`,
      method: 'get'
    })
  },
  // 角色数据更新
  update(data) {
    return request({
      url: `/system/role`,
      method: 'put',
      data
    })
  }
}
