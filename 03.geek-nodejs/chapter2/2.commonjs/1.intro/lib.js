console.log('hello node');

exports.hello = 'world';
exports.add = function (a, b) {
  return a + b;
}

exports.node = {hello: 'node'}

// module.exports 会覆盖了上面的 exports
module.exports = function minus(a, b) {
  return a - b
}

setTimeout(() => {
  console.log(exports)
}, 2000);