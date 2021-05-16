const db = require("./cloudDb");


async function addTodo(event) {
  if (event.title == undefined) return;
  let todo = {
    title: event.title,
    createTime: Date.now(),
    done: false
  }
  let backdata = await db.collection('todo').add(todo);
  return backdata;
}

exports.main = async (event, context) => {
  return addTodo(event);
};
