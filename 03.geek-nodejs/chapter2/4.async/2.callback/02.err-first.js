// try catch只能抓到一个调用堆栈内，即一个事件循环里的错误
// try {
interview(function (res) {
  if (res instanceof Error) {
    return console.log('cry');
  }
  console.log('smile');
});
// } catch (e) {
//   console.log('cry', e);
// }

function interview(callback) {
  setTimeout(() => {
    if (Math.random() < 0.2) {
      callback('success');
    } else {
      // throw new Error('fail');
      callback(new Error('fail'));
    }
  }, 500);
}