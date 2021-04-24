const qs = require('qs');
const baseHttpClient = require('../common/baseHttpClient');
const userRequestUrlMappingResolver = require('../config/client/userRequestUrlMappingResolver');

/*
    {
        result: {
            code: 0
            description: 'success'
        }, data {

        }
    }
 */

class UserController {
  async login(ctx) {
    const requestUrl = userRequestUrlMappingResolver.login;
    console.log(ctx.request.body);
    const response = await baseHttpClient.doHttpPostRequest(ctx, requestUrl, JSON.stringify(ctx.request.body));
    const responseData = qs.parse(response.data);
    const responseDataCode = responseData.result.code;

    // login successful
    if (0 === responseDataCode) {
      // nodejs 最主要的作用，对请求进行预处理，对响应进行加工
      ctx.body = responseData;
    } else {
      // 失败，请求降级
      ctx.body = responseData;
    }
  }
}

module.exports = new UserController();