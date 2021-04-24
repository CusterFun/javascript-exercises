NodeJS 作用：

1. 对请求进行预处理
2. 针对某一些业务场景，在 NodeJS 就完成响应

```text  


用户请求→→→→nginx→→→→→Node→→→→→网关(鉴权)→→→→→后端微服务
                      ↓
                    Redis           
```

```javascript
npm i koa
npm i @koa/router
npm i koa-bodyparser
npm i koa-static 
npm i koa-compress
npm i koa-combine-routers
npm i axios 
npm i jsonfile
npm i qs  
```

