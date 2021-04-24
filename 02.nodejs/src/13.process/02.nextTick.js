/*
下一个同步方法执行之后，或下一个异步方法执行之前，
让所指定的回调执行。
应用于把大的任务打散成多个小任务的场景。
 */

const fs = require('fs');

const myFunction = () => {
  console.log('myFunction invoked');
};

process.nextTick(myFunction);

console.log(fs.readFileSync('./02.nextTick.js').toString());

fs.readFile('./02.nextTick.js', (err, data) => {
  console.log(data.toString());
});
