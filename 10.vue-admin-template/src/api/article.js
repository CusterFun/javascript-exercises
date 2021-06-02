import request from '@/utils/request'

export default {
  // 分页条件查询文章列表
  getList(query, current = 1, size = 20) {
    return request({
      url: `/article/article/search`,
      method: 'post',
      data: { ...query, current, size }
    })
  }
}
