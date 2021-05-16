const db = require('../model/conn');

class TodoCtl {
  // 获取任务列表
  async find(ctx) {
    const backdb = await db.collection('todo').get();
    ctx.body = backdb;
  }

  // 添加任务
  async create(ctx) {
    const { title } = ctx.request.body;
    if (title == undefined) {
      return;
    }
    let todo = {
      title: ctx.request.body.title,
      createTime: Date.now(),// 云函数的运行环境内保持的是 UTC 时间，即 0 时区时间，和北京时间有 8 小时的时间差。
      // https://docs.cloudbase.net/cloud-function/timezone.html
      done: false
    }
    let baskdata = await db.collection('todo').add(todo);
    ctx.body = baskdata;
  }

  // 修改任务
  async update(ctx) {
    if (ctx.params.id == undefined) {
      ctx.body = '缺少id';
    }
    let todoDone = false;
    let { done } = ctx.request.body;
    if (done == undefined) {
      return;
    } else if (done == 1) {
      todoDone = true;
    }

    let todo = {
      title: ctx.request.body.title,
      done: todoDone
    }
    let backdata = await db.collection('todo').doc(ctx.params.id).update(todo);
    ctx.body = backdata;
  }

  // 删除任务
  async delete(ctx) {
    if (ctx.params.id == undefined) {
      ctx.body = '缺少id';
    }
    let backdata = await db.collection('todo').doc(ctx.params.id).remove();
    ctx.body = backdata;
  }
}

module.exports = new TodoCtl();