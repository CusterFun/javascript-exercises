const buffer = Buffer.from('hello');
const myObj = {};
const str = "aa";
const flag = true;
const count = 4;

console.log(typeof buffer);
console.log(typeof myObj);
console.log(typeof str);
console.log(typeof flag);
console.log(typeof count);

console.log(Buffer.isBuffer(myObj));
console.log(Buffer.isBuffer(buffer));