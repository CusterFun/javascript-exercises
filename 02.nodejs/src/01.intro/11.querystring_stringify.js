const querystring = require('querystring');

const obj = {
    name: 'zhangsan',
    address: 'shanghai'
}

const result = querystring.stringify(obj);

console.log(result);