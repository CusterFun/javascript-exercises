<template>
  <div>
    <div class="box-card">
      <el-card shadow="always">
        <el-input v-model="addData.title" placeholder="请输入内容">
          <el-button slot="append" @click="addTodo">添加任务</el-button>
        </el-input>
      </el-card>
    </div>

    <el-card class="box-card">
      <div v-for="(todo, key) in todos" :key="key" class="text item">
        <template v-if="todo.done == false">
          <div class="lists">
            <el-checkbox v-model="todo.done" @change="todoDone(key)">
              {{ todo.title }}
            </el-checkbox>
            <div>
              <i class="el-icon-notebook-2" @click="showTodo(key)"> </i>
              <i class="el-icon-delete" @click="deleteTodo(key)"> </i>
            </div>
          </div>
          <el-divider></el-divider>
        </template>
      </div>
    </el-card>

    <el-drawer title="任务想详情" :visible.sync="drawer">
      <div class="dra">
        <p>任务: {{ drawerTodo.title }}</p>
        <p>
          附件：
          <br />
          <img :src="drawerTodo.tempUrl" alt="" />
        </p>
        <p>
          <input type="file" ref="fil" />
          <el-button @click="upFile(drawerTodo._id)"> 点击上传 </el-button>
        </p>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addData: {
        title: "",
      },
      todos: [],
      drawer: false,
      drawerTodo: {},
    };
  },

  components: {},

  methods: {
    async addTodo() {
      var todoData = this.addData;
      var back = await this.$cloudbase.callFunction({
        name: "addtodo",
        data: todoData,
      });
      console.log(back);
      this.getData();
    },
    async getData() {
      var back = await this.$cloudbase.callFunction({
        name: "gettodo",
      });
      console.log(back);
      this.todos = back.result.data;
    },
    async deleteTodo(key) {
      const todoInfo = this.todos[key];
      var back = await this.$cloudbase.callFunction({
        name: "deltodo",
        data: { _id: todoInfo._id },
      });
      console.log(back);
      this.getData();
    },
    async showTodo(key) {
      let todoInfo = this.todos[key];
      if (todoInfo.fileId != undefined) {
        console.log(todoInfo.fileId);
        var back = await this.$cloudbase.getTempFileURL({
          fileList: [todoInfo.fileId],
        });
        console.log(back.fileList[0].tempFileURL);

        this.drawerTodo = todoInfo;
        this.drawerTodo.tempUrl = back.fileList[0].tempFileURL;
      }
      this.drawerTodo = todoInfo;
      this.drawer = true;
    },
    async upFile(id) {
      var s = this.$refs.fil.files[0];
      var back = await this.$cloudbase.uploadFile({
        // 云存储的路径
        cloudPath: "todo/" + Date.now() + s.name,
        // 需要上传的文件，File 类型
        filePath: this.$refs.fil.files[0],
      });
      console.log("上传图片成功: ", id, back.fileID);

      var changeData = {
        _id: id,
        fileId: back.fileID,
      };
      var changeBack = await this.$cloudbase.callFunction({
        name: "puttodo",
        data: changeData,
      });
      console.log(changeBack);
    },
  },

  mounted() {
    let auth = this.$cloudbase.auth();
    auth.anonymousAuthProvider().signIn();
    // 匿名登录成功检测登录状态isAnonymous字段为true
    // const loginState = await auth.getLoginState();
    // console.log(loginState.isAnonymousAuth); // true
    // https://docs.cloudbase.net/authentication/anonymous.html

    this.getData();
  },
};
</script>

<style scoped>
</style>