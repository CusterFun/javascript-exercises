const fs = require('fs');

const readStream = fs.createReadStream('01.fs_read.js', {encoding: 'utf8'});
const writeStream = fs.createWriteStream('info.txt', {encoding: 'utf8'});

readStream.on('data', (data) => {
  writeStream.write(data, () => {
    console.log(data);
  });
});