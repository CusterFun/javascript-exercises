console.log(async function f() {

});
// [AsyncFunction: f]

console.log(function () {
  return new Promise(resolve => {
    resolve();
  });
});
// [Function]

console.log(async function f() {

}());
// Promise { undefined }

console.log(function () {
  return new Promise(resolve => {
    resolve();
  });
}());
// Promise { undefined }

console.log(async function f() {
  return 4;
}());
// Promise { 4 }

console.log(function () {
  return new Promise(resolve => {
    resolve(4);
  });
}());
// Promise { 4 }

console.log(async function f() {
  throw new Error('4');
}());
// Promise {<rejected>: Error: 4}

console.log(function () {
  return new Promise((resolve, reject) => {
    reject(new Error('4'));
  });
}());
// Promise {<rejected>: Error: 4}