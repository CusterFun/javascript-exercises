const app = require('./app');

// 本地测试的入口文件 nodemon www.js
app.listen(3000, () => {
  console.log(`server is running at http://127.0.0.1:3000`);
});