import request from '@/utils/request'

export default {
  test() {
    return request({
      url: '/test', // /dev-api/test
      method: 'get'
    })
  }
}

