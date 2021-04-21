const url = require('url');

const urlObject = {
  host: 'www.baidu.com',
  port: '80',
  protocol: 'http:',
  search: '?orderId=12345',
  'query': 'order=12345',
  'path': '/'
};

let realAddress = url.format(urlObject);
console.log(realAddress);
