interview(function (err, res) {
  if (err) {
    return console.log('cry at 1st round');
  }
  interview(function (err, res) {
    if (err) {
      return console.log('cry at 2st round');
    }
    interview(function (err, res) {
      if (err) {
        return console.log('cry at 3st round');
      }
      console.log('smile');
    });
  });
});

function interview(callback) {
  setTimeout(() => {
    if (Math.random() > 0.2) {
      callback(null, 'success');
    } else {
      callback(new Error('fail'));
    }
  }, 500);
}
