const fs = require('fs');
const http = require('http');

const leak = [];

http.createServer(function (req, res) {
  res.writeHead(200);
  setTimeout(() => {
    // console.log(window.location.href);
    const result = fs.readFileSync(__dirname + '/index.html', 'utf-8');
    leak.push(result); // 模拟内存泄漏
    res.end(result);
  }, 50);
}).listen(3000, () => {
  console.log('listened 3000');
  // 模拟假死
  while (true) {}
});

