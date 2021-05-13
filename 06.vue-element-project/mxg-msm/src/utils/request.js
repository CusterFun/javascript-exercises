import axios from "axios";

// axios.get("/db.json").then((response) => {
//   const data = response.data;
//   console.log(data);
// });

const request = axios.create({
  // /db.json > 通过 axios > /dev-api/db.json > 通过代理转发（vue.config.js）> http://localhost:5500/public/db.json
  baseURL: process.env.VUE_APP_BASE_API,
  // baseURL: "/",
  timeout: 5000, // 请求超时，5000毫秒
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 请求拦截
    return config;
  },
  (err) => {
    // 出现异常
    return Promise.reject(err);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// http://localhost:8888/dev-api/db.json
// request.get("/db.json").then((response) => {
//   const data = response.data;
//   console.log(data);
// });

export default request; // 导出自定义创建 axios 对象
