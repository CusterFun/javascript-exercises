process.on('message', (str) => {
  console.log('child: ', str);
})