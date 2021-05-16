export default () => {
  let render = ctx => {
    return (json, message) => {
      ctx.set("Content-Type", "application/json");
      ctx.body = JSON.stringify({
        code: 1,
        data: json || {},
        message: message || "success"
      });
    }
  }

  let renderError = ctx => {
    return message => {
      ctx.set("Content-Type", "application/json");
      ctx.body = JSON.stringify({
        code: 0,
        data: {},
        message: message.toString()
      });
    }
  }

  return async (ctx, next) => {
    ctx.send = render(ctx);
    ctx.sendError = renderError(ctx);
    await next();
  }
}