const querystring = require('querystring');

const str = 'name=zhangsan&address=shanghai';

const obj = querystring.parse(str);

console.log(obj);