// 分配内存
const buffer = Buffer.alloc(128);

const length = buffer.write('hello node 你好', 'utf8');

console.log('byte count: ' + length);