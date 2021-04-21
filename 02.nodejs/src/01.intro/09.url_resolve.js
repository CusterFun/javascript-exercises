const url = require('url');

const urlAddress = url.resolve('http://www.baidu.com', 'order');
const urlAddress_new = new URL('order', 'http://www.baidu.com',);

console.log(urlAddress);
console.log(urlAddress_new.toString());