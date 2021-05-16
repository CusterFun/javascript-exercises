// 日志输出信息的封装
export default (ctx, msg, commonInfo) => {
  const {
    method, // 请求方法 get post put delete 或其他
    url, // 请求链接
    host, // 发送请求的客户端 host
    headers // 请求中的 headers
  } = ctx.request;

  const client = {
    method, url, host, msg, ip: ctx.get_client_ip(ctx),
    referer: headers['referer'], // 请求的源地址
    userAgent: headers['user-agent'] // 客户端信息，设备及浏览器信息
  }

  return JSON.stringify(Object.assign(commonInfo, client));
}