(function () {
  const result = async function () {
    let content = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 500);
    })
    console.log(content);
    return 4;
  }();

  setTimeout(() => {
    console.log(result);
  }, 800);
})()
// Promise{<pending>}
// undefined
// Promise{<fulfilled>: 4}
