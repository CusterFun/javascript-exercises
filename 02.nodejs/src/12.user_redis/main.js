const http = require('http');
const queryString = require('querystring');
const url = require('url');
const userController = require('./controller/userController');


const server = http.createServer((request, response) => {
  let data = '';

  request.on('data', (chunk) => {
    data += chunk;
  });

  request.on('end', () => {
    const requestUrl = request.url;
    const requestMethod = request.method;

    console.log(requestUrl);

    if (requestUrl.includes('login') && requestMethod === 'GET') {
      const requestParams = url.parse(requestUrl);
      const queryObject = queryString.parse(requestParams.query);
      console.log(queryObject);

      userController.userLogin(queryObject.username, queryObject.password);

      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.end('username: ' + queryObject.username + ', password: ' + queryObject.password);
    } else if (requestUrl.includes('logout') && requestMethod === 'GET') {
      const requestParams = url.parse(requestUrl);
      const queryObject = queryString.parse(requestParams.query);
      console.log(queryObject);

      userController.userLogout(queryObject.userSessionId);

      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.end('user logout');
    } else {
      if (!requestUrl.includes('favicon.ico')) {
        const requestParams = url.parse(requestUrl);
        const queryObject = queryString.parse(requestParams.query);
        console.log(queryObject);

        userController.userOtherOperation(queryObject.userSessionId);

        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('user other operation');
      }
    }
  });
});

server.listen(3000, () => {
  console.log('listening to port 30000');
});

/*
访问 URL：
登录：http://localhost:3000/login?username=zhangsan&password=123
redis 查看访问过期时间命令 pttl
redis 批量删除 redis-cli --scan --pattern 'myRedis*' | xargs -L 20 redis-cli del
登出：http://localhost:3000/logout?userSessionId=5126c160-a452-11eb-871b-cd80bb439441
重置：http://localhost:3000/reset?userSessionId=e6589d20-a453-11eb-b298-79972b99b850
 */