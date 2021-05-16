class TodoCtl {
  // 获取任务列表
  async find(ctx) {
    ctx.body = '获取任务列表';
  }

  // 添加任务
  async create(ctx) {
    ctx.body = '添加任务';
  }

  // 修改任务
  async update(ctx) {
    ctx.body = '修改任务';
  }

  // 删除任务
  async delete(ctx) {
    ctx.body = '删除任务';
  }
}

module.exports = new TodoCtl();