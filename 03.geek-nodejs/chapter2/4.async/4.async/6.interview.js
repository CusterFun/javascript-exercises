(async function f() {
  try {
    await Promise.all([
      interview(1),
      interview(2),
      interview(3)
    ]);
  } catch (e) {
    return console.log('cry at ' + e.round + 'st round');
  }
  console.log('smile');
})()

function interview(round) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.4) {
        resolve('success')
      } else {
        var err = new Error('fail');
        err.round = round;
        reject(err);
      }
    }, 500);
  });
}