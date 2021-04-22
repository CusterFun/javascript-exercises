// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });
// // node app.js delete --title="first note"
//
// const command = process.argv[2];
// if (command === 'add') {
//   console.log("Adding note!");
// } else if (command === 'delete') {
//   console.log("Remove note!")
// }

const yargs = require('yargs');
yargs.version('1.0.1');

const notes = require('./notes');

// add,remove,read,remove
yargs.command({
  command: 'add',
  description: 'Add a new note',
  builder: {
    title: { // 增加命令
      description: 'Note title', // 描述
      demandOption: true, // 必须
      type: 'string', // 类型
    },
    body: { // 增加命令
      description: 'Note body', // 描述
      demandOption: true, // 必须
      type: 'string', // 类型
    },
  },
  handler: function (argv) {
    notes.addNote(argv.title, argv.body);
  },
})

yargs.command({
  command: 'read',
  description: 'Read a note',
  handler: function () {
    console.log('Read a note')
  },
})

yargs.command({
  command: 'remove',
  description: 'Remove a note',
  handler: function () {
    console.log('Remove a note')
  },
})

yargs.command({
  command: 'list',
  description: 'List notes',
  handler: function () {
    console.log('List notes')
  },
})

// console.log(yargs.argv);
yargs.parse();
