import request from '@/utils/request'

export default {
  // 查询用户总记录数
  getUserTotal() {
    return request({
      url: `/system/user/total`,
      method: 'get'
    })
  },
  // 查询文章总记录数
  getArticleTotal() {
    return request({
      url: `/article/article/total`,
      method: 'get'
    })
  },
  // 查询用户总记录数
  getQuestionTotal() {
    return request({
      url: `/question/question/total`,
      method: 'get'
    })
  },
  // 查询各个分类下的文章
  getCategoryTotal() {
    return request({
      url: `/article/article/category/total`,
      method: 'get'
    })
  },
  // 查询近6个月分布的文章数
  getMonthArticleTotal() {
    return request({
      url: `/article/article/month/total`,
      method: 'get'
    })
  }

}
