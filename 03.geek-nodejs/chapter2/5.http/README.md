## 什么是 HTTP 服务？

HTTP 是什么？

- 应用层协议
- 五层网络协议

```text
1. 物理层 2. 数据链路层 3. 网络层 4. 运输层 5. 应用层
```

<img src="../../../images/001.http.png" alt="image-20210425185531148" style="zoom:100%;" />

- 一个网页请求，包含两次 HTTP 包交换
  - 浏览器向 HTTP 服务器发送请求 HTTP 包
  - HTTP 服务器向浏览器返回 HTTP 包

- HTTP 服务要做什么事情？
  - 解析进来的 HTTP 请求报文
  - 返回对应的 HTTP 返回报文

## HTTP 服务

```javascript
const http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200);
  res.end('hello');
}).listen(3000);
```

