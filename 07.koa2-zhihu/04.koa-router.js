const koa = require('koa');
const koaRouter = require('@koa/router');
const app = new koa();
const router = new koaRouter();

// 高级路由功能 前缀、多中间件等
const userRouter = new koaRouter({ prefix: '/users' }); // 前缀

const auth = async (ctx, next) => {
  if (ctx.url !== '/users') {
    ctx.throw(401);
  }
  await next();
};

router.get('/', (ctx) => {
  ctx.body = '这是主页';
});

userRouter.get('/', (ctx) => {
  ctx.body = '用户列表';
});

// 多中间件用法
userRouter.get('/:id', auth, (ctx) => {
  ctx.body = `这是用户: ${ctx.parmas.id}`;
});

app.use(router.routes());
app.use(userRouter.routes());

app.listen(3000);
