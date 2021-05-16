const db = require("./cloudDb");

async function showTodo() {
  const backDb = await db.collection('todo').get();
  return backDb;
}

exports.main = async (event, context) => {
  return showTodo();
};
