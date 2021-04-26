const koa = require('koa');
const fs = require('fs');
const mount = require('koa-mount');
const static = require('koa-static');
const graphqlHTTP = require('koa-graphql');
const schema = require('./schema');
const app = new koa();

app.use(
  mount('/api', graphqlHTTP({
    schema: schema,
    graphiql: true
  }))
)

app.use(
  mount('/static', static(`${__dirname}/source/static}`))
)

app.use(
  mount('/', async (ctx) => {
    ctx.status = 200;
    ctx.body = fs.readFileSync(`${__dirname}/source/index.htm`, 'utf-8')
  })
)

app.listen(3000);

/*
查询：http://localhost:3000/api?query={comment{name,content,praiseNum}}
点赞：### Send POST request with json body
POST http://localhost:3000/api
Content-Type: application/json

{
  "query":"mutation{praise(id:3)}"
}

 */