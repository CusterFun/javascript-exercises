import request from '@/utils/request'

export default {
  // 角色条件分页查询
  getList(query, current = 1, size = 20) {
    return request({
      url: `/system/role/search`,
      method: 'post',
      data: { ...query, current, size }
    })
  }
}
