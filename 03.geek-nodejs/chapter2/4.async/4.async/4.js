(function () {
  const result = async function () {
    try {
      let content = await new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('8'));
        }, 500);
      })
    } catch (e) {
      console.log('error', e.message);
    }
    console.log(content);
    return 4;
  }();

  setTimeout(() => {
    console.log(result);
  }, 800);
})()
// error 8
// Promise{<fulfilled>: 4}