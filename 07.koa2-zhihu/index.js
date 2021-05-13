const koa = require('koa');
const app = new koa();

// 第一个中间件
app.use(async (ctx, next) => {
  console.log(1)
  await next();
  console.log(2)
  ctx.body = 'hello 123';
});

// 第2个中间件
app.use(async (ctx, next) => {
  console.log(3);
  await next(); // 等下一个中间件执行完之后，再继续往下执行
  console.log(4)
});

// 第3个中间件
app.use(async (ctx) => {
  console.log(5)
});

app.listen(3000);

// 在浏览器执行 fetch('/').then(res=>res.text()).then(console.log)
// 1 -> 3 -> 5 -> 4 -> 2
// koa 中间件的洋葱模型

