const fs = require('fs');

fs.access('./info.txt', (err) => {
  if (err) throw err;
  console.log('success');
});

/*
[Error: ENOENT: no such file or directory, access './info1.txt']
 */