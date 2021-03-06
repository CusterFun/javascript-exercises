(function () {
  Promise.all([
    interview('baidu'),
    interview('tencent')
  ]).then(() => {
    console.log('smile');
  }).catch((err) => {
    console.log('cry for ' + err.name);
  });


  function interview(name) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.4) {
          resolve('success')
        } else {
          var err = new Error('fail');
          err.name = name;
          reject(err);
        }
      }, 500);
    });
  }
})();