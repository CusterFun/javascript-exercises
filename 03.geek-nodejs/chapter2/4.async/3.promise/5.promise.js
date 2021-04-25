(function () {
  let promise = interview();
  let promise2 = promise
    .then((res) => {
      return new Promise(function (resolve, reject) {
        setTimeout(() => {
          resolve('accept');
        }, 300);
      });
    });

  setTimeout(() => {
    console.log(promise);
    console.log(promise2);
  }, 800);

  setTimeout(() => {
    console.log(promise);
    console.log(promise2);
  }, 1000);


  function interview() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0) {
          resolve('success'); // resolve 和 reject 都只能接受一个参数
        } else {
          reject(new Error('fail'));
        }
      }, 500);
    });
  }
})()

