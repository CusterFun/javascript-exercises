const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const routing = require('./router');

const app = new Koa();

app.use(bodyparser());
routing(app);

module.exports = app;