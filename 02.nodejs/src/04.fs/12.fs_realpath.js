const fs = require('fs');

fs.realpath('info.txt', (err, resolvedPath) => {
  if (err) throw err;
  console.log(resolvedPath);
})