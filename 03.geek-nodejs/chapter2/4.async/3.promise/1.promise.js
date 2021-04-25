(function () {
  const promise = new Promise(function (resolve, reject) {
    setTimeout(() => {
      // resolve(3);
      reject(new Error('4'));
    }, 300);
  }).then(function (res) {
    // 进入 resolved 状态
    console.log(res);
  }).catch(function (err) {
    console.log(err);
  });

  console.log(promise);

  setTimeout(() => {
    console.log(promise);
  }, 800);
})();

