import request from '@/utils/request'

export default {
  // 分页条件查询标签列表
  getList(query, current = 1, size = 20) {
    return request({
      url: `/article/label/search`,
      method: 'post',
      data: { ...query, current, size } // 合并为一个新对象提交给后台数据接口
    })
  }
}
