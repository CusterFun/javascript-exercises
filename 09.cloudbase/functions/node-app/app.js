const Koa = require('koa');
const routing = require('./router');

const app = new Koa();

routing(app);

module.exports = app;