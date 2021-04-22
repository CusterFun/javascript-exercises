const fs = require("fs");

fs.writeFileSync('note.txt', 'Hello Nodejs!');

fs.appendFileSync('note.txt', 'Append');

const utils = require('./utils');

console.log(utils.thisAdd(1, 2));
console.log(utils.thisSub(2, 1));
