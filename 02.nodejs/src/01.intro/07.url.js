const url = require('url');

const urlString = 'http://www.baidu.com?orderId=12345';
const urlObject = url.parse(urlString);
const urlObject_new = new URL(urlString);

console.log(urlObject);
console.log(urlObject_new);