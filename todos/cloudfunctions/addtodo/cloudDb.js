// https://docs.cloudbase.net/database/introduce.html
const nodesdk = require('@cloudbase/node-sdk');

const cloudDb = nodesdk.init({
  env: 'test-8gzsbnsi974ecbea',
  secretId: 'AKIDYx84kgNo1ye4FD0ZsvjHZbNtABvOaWBd',
  secretKey: 'HI7h27xbLr76oFPJwJSLyLSUJXWEgrlQ',
})

// 获取数据库引用
const db = cloudDb.database();

module.exports = db;