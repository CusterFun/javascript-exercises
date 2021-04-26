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