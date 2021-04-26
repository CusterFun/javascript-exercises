```bash
npm run microservice

npm run bff
```

访问demo页

1. http://localhost:3000/download/
2. http://localhost:3000/detail/?columnid=233
3. http://localhost:3000/play/
4. http://localhost:3000/list/

## 下载页的需求解构

```javascript
const koa = require('koa');
const fs = require('fs');
const mount = require('koa-mount');
const static = require('koa-static');

const app = new koa();

app.use(
  static(__dirname + '/source/')
);

app.use(
  mount('/', async (ctx) => {
    ctx.body = fs.readFileSync(__dirname + '/source/index.html', 'utf-8');
  })
);

app.listen(3000);
```

## 详情页的需求解构

模板渲染

- include 子模板
- xss 过滤、模板 helper 函数

ES6 模板字符串当做模板引擎来用

```javascript
const user = {
  name: '<script />'
};

const result = `<h2>${user.name}</h2>`;
const vm = require('vm');

const templateMap = {
  templateA: '`<h2>${include("templateB")}</h2>`',
  templateB: '`<p>nodejs</p>`'
};

const context = {
  include: function (name) {
    return templateMap[name]();
  },
  _: function (markup) {
    if (!markup) return '';
    return String(markup)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/'/g, '&#39;')
      .replace(/"/g, '&quot;')
  },
}

Object.keys(templateMap).forEach((key => {
  const temp = templateMap[key];
  templateMap[key] = vm.runInNewContext(`
    (function(){
      return ${temp} 
    });
    `, context);
}));


console.log(templateMap['templateA']());

// const template = '<h2><%= user.name %></h2>';
// ejs.render(template, user);
```

详情页面

```javascript
const mount = require('koa-mount');
const static = require('koa-static');
const app = new (require('koa'));
const rpcClient = require('./client');
const template = require('./template');

const detailTemplate = template(__dirname + '/template/index.html');

app.use(mount('/static', static(`${__dirname}/source/static/`)));

app.use(async (ctx) => {

  const result = await new Promise((resolve, reject) => {
    rpcClient.write({
      columnid: ctx.query.columnid
    }, function (err, data) {
      err ? reject(err) : resolve(data)
    })
  });
  ctx.status = 200;
  ctx.body = detailTemplate(result);
});

app.listen(3000);
```

## 播放页的需求解构

API 服务 - RESTful

- 简单易懂
- 可以快速搭建
- 在数据的聚合方面有很大劣势

API 服务 - GraphQL

- 专注数据聚合，前端要什么就返回什么

- Fackbook 开发的实现 API 服务的库
  - 让前端有“自定义查询”数据的能力

GraphQL 示例

```javascript
const {graphql, buildSchema} = require('graphql');

// Construct a schema, using  GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
   }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello World!';
  },
};

// Run the GraphQL query '{hello}' and print out the response
graphql(schema, '{ hello }', root).then((response) => {
  console.log(response);
});
```

可以进行封装

```javascript
const {graphql, buildSchema} = require('graphql');

// Construct a schema, using  GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
   }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello World!';
  },
};

// Run the GraphQL query '{hello}' and print out the response
module.exports = function (query) {
  return graphql(schema, query, root).then((response) => {
    console.log(response);
  });
}
```

在别的地方就可以调用

```javascript
const query = require('./graphql');

query('{hello}').then(res => {
  console.log(res)
});
```

请求的 query 是由前端传递的

## 列表页需求解构

后端需要渲染列表

- 首屏加速
- SEO

前端也需要渲染列表

- 无刷新过滤、排序

前后端同构

- 同一个模板/组件，可在浏览器渲染，也可以在 Node.js 渲染

- ReactDomServer.renderToString()
- VueServerRenderer.renderToString()

需要在 node 端支持 jsx 语法需要安装

```bash
npm i react react-dom @babel/register @babel/preset-react @babel/core
```

- React/Vue 同构的最大难题其实是数据部分

index.js

```javascript
require('@babel/register')({
  presets: ['@babel/preset-react']
});

const ReactDOMServer = require('react-dom/server');

console.log(
  ReactDOMServer.renderToString(require('./index.jsx'))
)
```

index.jsx

```javascript
const React = require('react');

class App extends React.Component {
  render() {
    return (
      <p></p>
    )
  }
}

module.exports = <App/>;
```

- 同构的关键
- 注重职责的分离（处理数据、处理环境分割）

