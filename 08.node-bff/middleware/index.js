import Log from './log';
import Send from './send';
import Func from './func';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';

export default app => {
  // 当数据超过 2kb 的时候，通过压缩来提高传输速度
  app.use(compress({
    threshold: 2048
  }));

  // 缓存拦截器
  app.use(async (ctx, next) => {
    if (ctx.url === '/favicon.ico') return;

    await next();
    ctx.status = 200;
    ctx.set('Cache-Control', 'must-revalidation');
    if (ctx.fresh) {
      ctx.status = 304;
    }
  });

  // 日志中间件
  app.use(Log());

  // 数据返回的封装
  app.use(Send());

  // 方法封装
  app.use(Func());

  // 请求中间件
  app.use(bodyParser());

  // 增加错误的监听处理
  app.on("error", (err, ctx) => {
    if (ctx && !ctx.headerSent && ctx.status < 500) {
      ctx.status = 500;
    }
    if (ctx && ctx.log && ctx.log.error) {
      if (!ctx.state.logged) {
        ctx.log.error(err.stack);
      }
    }
  });
};