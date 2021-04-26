const mount = require('koa-mount');
const static = require('koa-static');
const app = new (require('koa'));

const ReactDOMServer = require('react-dom/server');
require('@babel/register')({
  presets: ['@babel/preset-react']
});

const getFakeData = require('./fake-data');
const template = require('./template')(__dirname + '/index.htm');

app.use(mount('/static', static(__dirname + '/source')));

const getApp = require('./app.jsx');
app.use(async (ctx) => {
  const category = isNaN(+(ctx.query.category)) ? 0 : ctx.query.category;
  const sort = isNaN(+(ctx.query.sort)) ? 0 : ctx.query.sort;

  const data = getFakeData(sort, category);
  const reactString = ReactDOMServer.renderToString(getApp(data));
  console.log(reactString);
  ctx.status = 200;
  ctx.body = template({
    reactString
  })
})

app.listen(3000);