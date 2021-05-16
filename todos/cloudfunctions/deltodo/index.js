const db = require("./cloudDb");

async function delTodo(event) {
  if (event._id == undefined) return;
  let backdata = await db.collection('todo').doc(event._id).remove();
  return backdata;
}

exports.main = async (event, context) => {
  return delTodo(event);
};
