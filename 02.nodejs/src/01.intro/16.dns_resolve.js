const dns = require('dns');

const domain = 'www.sohu.com';

dns.resolve(domain, function (error, address) {
  if (error) {
    console.log(error);
    return;
  }
  console.log(address); // [ '162.14.132.217' ]
});