(async function f() {
  try {
    await interview(1);
    await interview(2);
    await interview(3);
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