const Router = require('@koa/router');
const router = new Router();

router.get('/users', (ctx) => {
  ctx.body = '用户列表';
});

router.get('/users/:id', (ctx) => {
  ctx.body = `这是用户 ${ctx.params.id}`;
});

module.exports = router;