const db = require("./cloudDb");

async function putTodo(event) {

  console.log(event._id);
  if (event._id == undefined) return;
  let backdata = await db.collection('todo').doc(event._id).update({ fileId: event.fileId });
  return backdata;
}

exports.main = async (event, context) => {
  return putTodo(event);
};
