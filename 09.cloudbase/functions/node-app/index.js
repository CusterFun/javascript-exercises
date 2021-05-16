const serverless = require('serverless-http');
const app = require('./app');

const handler = serverless(app);

exports.main = async (event, context) => {
  const res = await handler(event, context);
  return res;
}