const Router = require('@koa/router');
const userRouter = new Router();
const userController = require('../controller/userController');
const userServerUrlMappingResolver = require('../config/server/userServerUrlMappingResolver');

// 将 url 请求映射到 controller
userRouter.post(userServerUrlMappingResolver.login, userController.login);

module.exports = userRouter;