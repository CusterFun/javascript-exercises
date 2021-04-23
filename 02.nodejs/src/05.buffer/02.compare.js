const buffer1 = Buffer.from('hello');
const buffer2 = Buffer.from('world');

// 第一个字母 h 的 ASCII 码小于 w，所以返回 -1，相等返回 0，大于返回 1
const compareResult = buffer1.compare(buffer2);
console.log(compareResult);
