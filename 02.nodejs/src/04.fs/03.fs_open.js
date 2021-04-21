const fs = require('fs');

fs.open('test.txt', 'r+', function (err, fd) {
  if (err) {
    return console.error(err);
  }
  console.log('file is open');
});