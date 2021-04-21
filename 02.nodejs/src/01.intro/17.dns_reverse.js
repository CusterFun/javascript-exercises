const dns = require('dns');

dns.reverse('162.14.132.217',function(error, domain) {
    console.log(domain);
});