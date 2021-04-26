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