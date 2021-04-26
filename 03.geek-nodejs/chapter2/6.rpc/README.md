## RPC 调用

Remote Procedure Call（远程过程调用）

和 Ajax 有什么相同点

- 都是两个计算机之间的网络通信
- 需要双方约定一个数据格式

和 Ajax 有什么不同点

- 不一定适用 DNS 作为寻址服务
- 应用层协议一般不适用 HTTP
- 基于 TCP 或 UDP 协议

寻址/负载均衡

- Ajax：使用 DNS 进行寻址

TCP 通信方式

- 单工通信
- 半双工通信
- 全双工通信

二进制协议

- 更小的数据包体积
- 更快的编解码速率

## Node.js Buffer 编解码二进制数据包

```javascript
// Buffer 创建
const buffer1 = Buffer.from('nodejs');
const buffer2 = Buffer.from([1, 2, 3, 4]);
const buffer3 = Buffer.alloc(20);

console.log(buffer1);
console.log(buffer2);
console.log(buffer3);

// Buffer 写入
buffer2.writeInt8(12, 1);
console.log(buffer2);
buffer2.writeInt16BE(512,2);
console.log(buffer3);
```

使用 Protocol Buffers for Node.js [protocol-buffers](https://www.npmjs.com/package/protocol-buffers)

```javascript
const fs = require('fs');
const protobuf = require('protocol-buffers');

// 根据协议，编译出一个 js 逻辑对象，里面包含 encode 和 decode 函数
// 实际写 web 服务器的时候，注意这个操作可以直接在进程启动就做
// 否则在 http 处理过程里做的话，是一次不必要的性能消耗
const schemas = protobuf(fs.readFileSync(__dirname + '/test.proto', 'utf-8'));

const buffer = schemas.Course.encode({
  id: 4,
  name: 'nodejs',
  lesson: []
});

console.log(buffer);
console.log(schemas.Course.decode(buffer));
```

## Node.js net 搭建多路复用的 RPC 通道

server.js 服务端

```javascript
const net = require('net');

const server = net.createServer((socket) => {
  socket.on('data', function (buffer) {
    console.log(buffer, buffer.toString());
  })
});

server.listen(4000);
```

client.js 客户端

```javascript
const net = require('net');

const socket = new net.Socket({});

socket.connect({
  host: '127.0.0.1',
  port: 4000
});

socket.write('good morining nodejs');
```

半双工通信，客户端接收到服务端返回的消息时继续发送下一个消息给服务端

```javascript
const net = require('net');

const socket = new net.Socket({});

socket.connect({
  host: '127.0.0.1',
  port: 4000
});

// socket.write('good morning nodejs');

const LESSON_IDS = [
  "136797",
  "136798",
  "136799",
  "136800",
  "136801",
  "136803",
  "136804",
  "136806",
  "136807",
  "136808",
  "136809",
  "141994",
  "143517",
  "143557",
  "143564",
  "143644",
  "146470",
  "146569",
  "146582"
]

let buffer = Buffer.alloc(4);
let lessonId = Math.floor(Math.random() * LESSON_IDS.length);
buffer.writeInt32BE(
  LESSON_IDS[lessonId]
);
socket.write(buffer);

socket.on('data', (buffer) => {
  console.log(lessonId, buffer.toString());

  buffer = Buffer.alloc(4);
  lessonId = Math.floor(Math.random() * LESSON_IDS.length);
  buffer.writeInt32BE(
    LESSON_IDS[lessonId]
  );
  socket.write(buffer);
});
```

服务端

```javascript
const net = require('net');

const server = net.createServer((socket) => {
  socket.on('data', function (buffer) {
    const lessonId = buffer.readInt32BE();
    setTimeout(() => {
      socket.write(Buffer.from(LESSON_DATA[lessonId]));
    }, 500);
  })
});

server.listen(4000);

// 假数据
const LESSON_DATA = {
  136797: "01 | 课程介绍",
  136798: "02 | 内容综述",
  136799: "03 | Node.js是什么？",
  136800: "04 | Node.js可以用来做什么？",
  136801: "05 | 课程实战项目介绍",
  136803: "06 | 什么是技术预研？",
  136804: "07 | Node.js开发环境安装",
  136806: "08 | 第一个Node.js程序：石头剪刀布游戏",
  136807: "09 | 模块：CommonJS规范",
  136808: "10 | 模块：使用模块规范改造石头剪刀布游戏",
  136809: "11 | 模块：npm",
  141994: "12 | 模块：Node.js内置模块",
  143517: "13 | 异步：非阻塞I/O",
  143557: "14 | 异步：异步编程之callback",
  143564: "15 | 异步：事件循环",
  143644: "16 | 异步：异步编程之Promise",
  146470: "17 | 异步：异步编程之async/await",
  146569: "18 | HTTP：什么是HTTP服务器？",
  146582: "19 | HTTP：简单实现一个HTTP服务器"
}
```

全双工通信，自由发送，不需要等待请求的返回

```javascript
const net = require('net');

const socket = new net.Socket({});

socket.connect({
  host: '127.0.0.1',
  port: 4000
});

// socket.write('good morning nodejs');

const LESSON_IDS = [
  "136797",
  "136798",
  "136799",
  "136800",
  "136801",
  "136803",
  "136804",
  "136806",
  "136807",
  "136808",
  "136809",
  "141994",
  "143517",
  "143557",
  "143564",
  "143644",
  "146470",
  "146569",
  "146582"
]

let id = Math.floor(Math.random() * LESSON_IDS.length);

socket.on('data', (buffer) => {
  const seqBuffer = buffer.slice(0, 2);
  const titleBuffer = buffer.slice(2);

  let id = Math.floor(Math.random() * LESSON_IDS.length);
  console.log(seqBuffer.readInt16BE(), titleBuffer.toString());

  socket.write(encode(id));
});

let seq = 0;

function encode(index) {
  buffer = Buffer.alloc(6);
  buffer.writeInt16BE(seq);
  buffer.writeInt32BE(
    LESSON_IDS[index], 2
  );
  console.log(seq, LESSON_IDS[index]);
  seq++;
  return buffer;
}

// 每 50 秒发一个包，模拟全双工通信
// setInterval(function () {
//   socket.write(encode(id));
// }, 50);

// 同时发100个包  TCP 粘包
for (let k = 0; k < 100; k++) {
  let id = Math.floor(Math.random() * LESSON_IDS.length);
  socket.write(encode(id));
}
```

服务端

```javascript
const net = require('net');

const server = net.createServer((socket) => {
  socket.on('data', function (buffer) {
    const seqBuffer = buffer.slice(0, 2);
    const lessonId = buffer.readInt32BE(2);
    setTimeout(() => {
      const buffer = Buffer.concat([seqBuffer, Buffer.from(LESSON_DATA[lessonId])]);
      socket.write(buffer);
    }, 10 + Math.random() * 1000);
  })
});

server.listen(4000);

// 假数据
const LESSON_DATA = {
  136797: "01 | 课程介绍",
  136798: "02 | 内容综述",
  136799: "03 | Node.js是什么？",
  136800: "04 | Node.js可以用来做什么？",
  136801: "05 | 课程实战项目介绍",
  136803: "06 | 什么是技术预研？",
  136804: "07 | Node.js开发环境安装",
  136806: "08 | 第一个Node.js程序：石头剪刀布游戏",
  136807: "09 | 模块：CommonJS规范",
  136808: "10 | 模块：使用模块规范改造石头剪刀布游戏",
  136809: "11 | 模块：npm",
  141994: "12 | 模块：Node.js内置模块",
  143517: "13 | 异步：非阻塞I/O",
  143557: "14 | 异步：异步编程之callback",
  143564: "15 | 异步：事件循环",
  143644: "16 | 异步：异步编程之Promise",
  146470: "17 | 异步：异步编程之async/await",
  146569: "18 | HTTP：什么是HTTP服务器？",
  146582: "19 | HTTP：简单实现一个HTTP服务器"
}
```

- 单工/半双工的通信通道搭建
- 全双工的通信通道搭建
  - 关键在于应用层协议需要有标记包号的字段
  - 处理以下情况，需要有标记包长的字段
    - 粘包
    - 不完整包
  - 错误处理