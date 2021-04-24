const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
  ctx.response.type = 'application/json';

  const responseBody = {
    result: {
      code: 0,
      description: 'success'
    }, data: {
      username: 'zhangsan',
      address: 'shanghai',
      age: 20
    }
  };
  ctx.body = JSON.stringify(responseBody);
});

app.listen(4000);

/*
POST http://localhost:3000/users/user/login
Content-Type: application/json

{
  "id": 999,
  "value": "content"
}

curl -X POST -H "Content-Type: application/json;charset=utf-8" -d '{"username":"hello","password":"12345"}' http://localhost:3000/users/user/login
 */