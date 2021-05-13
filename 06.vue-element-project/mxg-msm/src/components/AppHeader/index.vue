<template>
  <div class="header">
    <a href="#/">
      <img class="logo" src="@/assets/logo.png" width="25px" />
      <span class="company">会员管理系统</span>
    </a>

    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a" icon="el-icon-edit"
          >修改密码</el-dropdown-item
        >
        <el-dropdown-item command="b" icon="el-icon-s-fold"
          >退出系统</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  methods: {
    handleCommand(command) {
      this.$message("click on item " + command);
    },
  },
};
</script>

<style scoped>
.logo {
  vertical-align: middle; /* 垂直位置居中 */
  padding: 0px 10px 0px 40px; /* 单独指定上右下左 */
}
.company {
  position: absolute;
  color: white;
}
/* 下拉菜单 */
.el-dropdown {
  float: right;
  margin-right: 40px;
}
.el-dropdown-link {
  color: white; /* 字体颜色 */
  cursor: pointer; /* 手的形状 */
}
</style>
