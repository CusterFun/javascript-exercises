import request from '@/utils/request'

export default {
  // 分页条件查询分类列表
  getList(query, current = 1, size = 20) {
    return request({
      url: `/article/category/search`,
      method: 'post',
      data: { // 重新组合成一个新的对象 {name:'前端',status:1,current:current,size:size}
        ...query,
        current,
        size
      }
    })
  },
  // 新增类别
  add(data) {
    return request({
      url: `/article/category`,
      method: 'post',
      data
    })
  }
}
