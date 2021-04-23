const buffer = Buffer.from('你好世界');
const jsonString = JSON.stringify(buffer);

console.log(jsonString);

const jsonObject = JSON.parse(jsonString);

console.log(jsonObject);

const buffer2 = Buffer.from(jsonObject);
console.log(buffer2.toString());