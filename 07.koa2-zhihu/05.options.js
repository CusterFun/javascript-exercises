// HTTP options 方法的作用是什么？
// 1. 检测服务器所支持的请求方法
// 2. CORS 中的预检请求
// allowedMethods 的作用
// 1. 响应 options 方法，告诉它所支持的请求方法
// 2. 相应的返回 405(不允许 支持的常见方法，但是没有实现) 和 501(没实现LINK这种不常见的，koa不支持)
const koa = require('koa');
const koaRouter = require('@koa/router');

const app = new koa();
const router = new koaRouter();

router.get('/:id', (ctx) => {
  ctx.body = `${ctx.params.id}`;
});

app.use(router.routes());
app.use(router.allowedMethods()); // 所有接口都可以支持 options 请求

app.listen(3000);