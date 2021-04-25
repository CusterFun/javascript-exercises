(function () {
  let promise = interview();
  promise.then((res) => {
    console.log('smile');
  }).catch((err) => {
    console.log('cry');
  });
})()

function interview() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) {
        resolve('success'); // resolve 和 reject 都只能接受一个参数
      } else {
        reject(new Error('fail'));
      }
    }, 500);
  });
}