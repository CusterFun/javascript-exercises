import request from "@/utils/request";

// const BASE_URI = process.env.VUE_APP_BASE_API;

// 测试1：调用 get 方法发送请求
// request.get("/db.json").then((response) => {
//   console.log(response.data);
// });

// 测试2：以对象配置的方式进行制定请求方式
request({
  method: "get",
  url: "/db.json",
}).then((response) => {
  console.log("get2", response.data);
});

export default {
  getList() {
    const req = request({
      method: "get",
      url: "/db.json",
      // url: "http://127.0.0.1:5500/public/db.json",
      // url: BASE_URI + "/db.json",
    });
    return req;
  },
};
