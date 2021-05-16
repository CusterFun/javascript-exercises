const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

router.get('/users', (ctx) => {
  ctx.body = '用户列表';
});

router.get('/users/:id', (ctx) => {
  ctx.body = `这是用户 ${ctx.params.id}`;
});

app.use(router.routes());

// app.listen(3000, () => {
//   console.log(`server is running at http://127.0.0.1:3000`);
// });

module.exports = app;