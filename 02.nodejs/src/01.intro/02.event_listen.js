const http = require('http');
const httpServer = new http.Server();

// request 事件监听
httpServer.on('request', function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello Node.js');
});

httpServer.listen(3000, function () {
    console.log('Node Server started on port 3000');
});