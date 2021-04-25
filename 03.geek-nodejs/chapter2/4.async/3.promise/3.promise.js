(function () {
  let promise = interview();
  let promise2 = promise
    .then((res) => {
      // throw new Error('refuse');
      return 'accept';
    });

  setTimeout(() => {
    console.log(promise);
    console.log(promise2);
  }, 800);

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
})()

