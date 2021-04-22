const add = function (a, b) {
  return a + b;
}

const sub = function (a, b) {
  return a - b;
}
module.exports = {
  thisAdd: add,
  thisSub: sub,
};

console.log(module);