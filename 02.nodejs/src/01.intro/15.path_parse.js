const path = require('path');

const filePath = '/Users/custer/node/test.js';

const obj = path.parse(filePath);

console.log(obj);

/**
 {
  root: '/',
  dir: '/Users/custer/node',
  base: 'test.js',
  ext: '.js',
  name: 'test'
}
 */