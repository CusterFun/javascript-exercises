(function () {
  const result = async function () {
    let content = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(6);
      }, 500);
    })
    console.log(content);
    return 4;
  }();

  setTimeout(() => {
    console.log(result);
  }, 800);
})()
// 6
// Promise { 4 }