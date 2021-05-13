// 自己实现路由中间件
// 1. 处理不同的 URL
// 2. 处理不同的 HTTP 方法
// 3. 解析 URL 上的参数
const koa = require('koa');
const app = new koa();

app.use(async (ctx) => {
  if (ctx.url === '/') {
    ctx.body = '这是主页';
  } else if (ctx.url === '/users') {
    if (ctx.method === 'GET') {
      ctx.body = '这是用户列表页';
    } else if (ctx.method === 'POST') {
      ctx.body = '创建用户'
    } else {
      ctx.status = 405; // 方法不允许
    }
  } else if (ctx.url.match(/\/users\/\w+/)) {
    const userId = ctx.url.match(/\/users\/(\w+)/)[1];
    ctx.body = `这是用户 ${userId}`;
  } else {
    ctx.status = 404;
  }
});

app.listen(3000);