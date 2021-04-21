const http = require('http');
const querystring = require('querystring');
const url = require('url');

const userService = require('./UserService');

const server = http.createServer(function (request, response) {
    let data = '';

    request.on('data', function (chunk) {
        data += chunk;
    });

    request.on('end', function () {
        const requestUrl = request.url;
        const requestMethod = request.method;

        if (requestUrl.includes('login') && requestMethod === 'GET') {
            // const requestParams = new URL(requestUrl);
            const requestParams = url.parse(requestUrl);
            console.log(requestParams);

            const queryObject = querystring.parse(requestParams.query);
            console.log(queryObject);

            const loginResult = userService.login(queryObject.username, queryObject.password);
            console.log('loginResult: ' + loginResult);

            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end('username: ' + queryObject.username + ', password: ' + queryObject.password);
        }
    });
});

server.listen(3000, function () {
    console.log('Server is listening on port 3000');
})

// 浏览器访问 http://localhost:3000/login?username=zhangsan&password=123