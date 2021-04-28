## 下载页面的优化

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

首先通过 node --inspect-brk entry.js 打开 chorme 调试工具。

然后进行 ab 压测 ab -c50 -t15 http://localhost:3000/download/

可以看到每次访问都会打开 fs 文件，所以可以把 fs 文件保存到变量。

```javascript
const str = fs.readFileSync(__dirname + '/source/index.html', 'utf-8');
app.use(
  mount('/', async (ctx) => {
    ctx.body = str;
  })
);
```

可以看到这个问题就解决了。

继续优化下面的问题，每次 string 转 buffer 都需要 计算 string 的长度，是个耗时项，可不可以直接传buffer 呢？

```javascript
const buffer = fs.readFileSync(__dirname + '/source/index.html');
app.use(
  mount('/', async (ctx) => {
    ctx.status = 200;
    ctx.type = 'html';
    ctx.body = buffer;
  })
);
```

优化手段的总结：

> 尽量的把我们在中间件流程里面的计算，移到程序启动的时候去执行。

## JavaScript 代码性能优化

计算性能优化的本质

- 减少不必要的计算
- 空间换时间 （把需要重复计算的结果缓存起来，下次就可以直接使用）

思考：在用户能感知到的时间里，这个计算是不是必要的。

Node.js HTTP 服务性能优化准则：

- 提前计算 （**启动阶段** 计算结果在 **服务阶段** 使用。）

## 内存管理

垃圾回收

堆内存 分为 新生代 和 老生代 （内存更大，清理频率低）

- 新生代：容量小，垃圾回收更快
- 老生代：容量大，垃圾回收更慢

减少内存使用，也是提高服务性能的手段

如果有内存泄漏，会导致服务性能大大降低

Node.js  Buffer 的内存分配策略，小于 8kb 的 Buffer 都放在 8kb 的 char[] 数组。

节省内存的最好方式就是：**使用池**。

## Node.js C++ 插件

将计算量转移到 C++ 进行

- 收益：C++ 运算比 JavaScript 更快的部分
- 成本：C++ 变量和 V8 变量的转换

收益是否抵得过成本？

## Node.js 子进程与线程

进程：

- 操作系统挂载运行程序的单元
- 拥有一些独立的资源，如内存等

线程：

- 进行运算调度的单元
- 进程内的线程共享进程内的资源

进程类似“公司”，线程类似公司的“职员”

Node.js 的事件循环

- 主线程运行 v8 与 JavaScript
- 多个子线程通过事件循环被调度

使用子进程或线程利用更多 CPU 资源

### 主进程给子进程发送消息

主进程

```javascript
const cp = require('child_process');

const child_process = cp.fork(__dirname + '/1.child.js');

child_process.send('haha');
```

子进程

```javascript
process.on('message', (str) => {
  console.log(str);
})
```

### 子进程给主进程发送消息

```javascript
const cp = require('child_process');

const child_process = cp.fork(__dirname + '/2.child.js');

child_process.send('haha');

child_process.on('message', (str) => {
  console.log('parent: ', str);
})
```

```javascript
process.on('message', (str) => {
  console.log('child: ', str);

  process.send('hehe');
})
```

## Node.js Cluster 模块

```javascript
const cluster = require('chapter4/2');

if (cluster.isMaster) {
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  require('./app');
}
```

```javascript
const fs = require('fs');
const http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200);
  res.end(fs.readFileSync(__dirname + '/index.html', 'utf-8'));
}).listen(3000, () => {
  console.log('listened 3000');
});
```

```bash
ab -c50 -n400 http://localhost:3000/
This is ApacheBench, Version 2.3 <$Revision: 1879490 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Completed 100 requests
Completed 200 requests
Completed 300 requests
Completed 400 requests
Finished 400 requests


Server Software:        
Server Hostname:        localhost
Server Port:            3000

Document Path:          /
Document Length:        254151 bytes

Concurrency Level:      50
Time taken for tests:   0.462 seconds
Complete requests:      400
Failed requests:        0
Total transferred:      101690400 bytes
HTML transferred:       101660400 bytes
Requests per second:    865.34 [#/sec] (mean)
Time per request:       57.780 [ms] (mean)
Time per request:       1.156 [ms] (mean, across all concurrent requests)
Transfer rate:          214836.82 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   1.1      0       4
Processing:     9   53   7.7     53      71
Waiting:        3   49  10.3     50      66
Total:         10   54   7.1     54      73

Percentage of the requests served within a certain time (ms)
  50%     54
  66%     57
  75%     59
  80%     60
  90%     63
  95%     64
  98%     68
  99%     68
 100%     73 (longest request)
```

可以直接使用 cpu 核数

```javascript
const os = require('os');
const cluster = require('chapter4/2');

if (cluster.isMaster) {
  for (let i = 0; i < os.cpus().length / 2; i++) {
    cluster.fork();
  }
} else {
  require('./app');
}
```

## Node.js 进程守护与管理

Node.js 的稳定性

```javascript
const fs = require('fs');
const http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200);
  setTimeout(() => {
    console.log(window.location.href);
    res.end(fs.readFileSync(__dirname + '/index.html', 'utf-8'));
  }, 50);
}).listen(3000, () => {
  console.log('listened 3000');
});
```

启动程序没有问题，当访问到这里的时候才会报错

```bash
    console.log(window.location.href);
                ^

ReferenceError: window is not defined

```

多执行几次，主进程就退出了。这个错误就导致了整个程序的崩溃。

```javascript
  // 当进程出现会崩溃的错误
  process.on('uncaughtException', (err) => {
    // 未捕获的错误信息进行上报
    console.err(err);
    process.exit(1); //进程退出
  });
```

重启机制

```javascript
 // 间隔5秒复活一个挂了的进程
  cluster.on('exit', () => {
    setTimeout(() => {
      cluster.fork();
    }, 5000);
  });
```

模拟内存泄漏 oom

```javascript
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
});
```

循环检测内存使用情况

```javascript
// 内存使用超过 700，判断为有内存泄漏，自杀
  setInterval(() => {
    console.log(process.memoryUsage().rss);
    if (process.memoryUsage().rss > 734003200) {
      console.log('oom'); // 上报
      process.exit(1);
    }
  }, 5000);
```

模拟假死

```javascript
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
```

心跳检测

```javascript
const os = require('os');
const cluster = require('cluster');

if (cluster.isMaster) {
  // for (let i = 0; i < os.cpus().length / 2; i++)
  for (let i = 0; i < 1; i++) {
    const worker = cluster.fork();
    let missedPing = 0;
    let inter = setInterval(() => {
      console.log('ping');
      worker.send('ping'); // 每隔3秒向子进程发送心跳
      missedPing++;

      if (missedPing >= 3) {
        clearInterval(inter);
        process.kill(worker.process.pid); // 丢失3次心跳，退出
      }
    }, 300);
    worker.on('message', (msg) => {
      console.log('pong');
      if (msg === 'pong') {
        missedPing--;
      }
    });
  }

  // 间隔5秒复活一个挂了的进程
  cluster.on('exit', () => {
    setTimeout(() => {
      cluster.fork();
    }, 5000);
  });
} else {
  require('./app');
  process.on('message', (str) => {
    if (str === 'ping') {
      process.send('pong');
    }
  })
  // 当进程出现会崩溃的错误
  process.on('uncaughtException', (err) => {
    // 未捕获的错误信息进行上报
    console.err(err);
    process.exit(1); //进程退出
  });

  // 内存使用超过 700，判断为有内存泄漏，自杀
  setInterval(() => {
    console.log(process.memoryUsage().rss);
    if (process.memoryUsage().rss > 734003200) {
      console.log('oom'); // 上报
      process.exit(1);
    }
  }, 5000);
}
```

## 动静分离

静态内容

- 基本不会变动，也不会因为请求参数不同而变化
- CDN 分发，HTTP 缓存等

动态内容

- 各种因为请求参数不同而变动，且变种的数量几乎不可枚举

- 用大量的源站机器承载，结合反向代理进行负载均衡

查看端口

```bash
netstat -nlp | grep 80
```

centos 安装 ab 工具

```bash
yum install httpd-tools
```

ab -c 400 -n 1600 http://localhost

