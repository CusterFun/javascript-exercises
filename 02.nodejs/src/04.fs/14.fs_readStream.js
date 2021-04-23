const fs = require('fs');

const readStream = fs.createReadStream('info.txt', {encoding: 'utf8'});

readStream.on('open', (fd) => {
  console.log(fd); // 文件描述符 20
});

readStream.on('ready', () => {
  console.log('read');
});

readStream.on('data', (data) => {
  console.log(data);
});

readStream.on('end', () => {
  console.log('end');
});

readStream.on('close', () => {
  console.log('close');
})

readStream.on('error', (err) => {
  console.log(err);
});