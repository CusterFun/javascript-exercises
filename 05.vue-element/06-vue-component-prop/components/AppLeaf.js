; (function () {
  const template = `<div class="col-sm-3 col-md-2 sidebar">
  <ul class="nav nav-sidebar">
    <li class="active"><a href="#">Overview
    <span v-show="delNum">({{delNum}})</span></a></li>
    <li><a href="#">Reports</a></li>
    <li><a href="#">Analytics</a></li>
    <li><a href="#">Export</a></li>
  </ul>
</div>`;

  window.AppLeaf = {
    template,
    data() {
      return {
        delNum: 0 // 已经删除 的总数量
      }
    },
    created() {
      // 订阅消息
      PubSub.subscribe('changeNum', (event, num) => { // 使用 this，应该箭头函数
        // 事件回调处理
        // 统计已经删除的总数量
        this.delNum = this.delNum + num;
      })
    },
  }

})()