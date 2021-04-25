interview(function () {
  console.log('smile');
});

function interview(callback) {
  setTimeout(() => {
    callback('success');
  }, 500);
}