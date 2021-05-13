import Vue from "vue";
import VueRouter from "vue-router";
// import Login from "../views/login/index.vue";
// 下面情况，默认会导入 ../views/login 目录下的 index.vue 组件
import Login from "../views/login";
import Layout from "@/components/Layout.vue";
import Home from "@/views/home";
import Member from "@/views/member";
import Supplier from "@/views/supplier";
import Goods from "../views/goods";
import Staff from "../views/staff";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "layout", // 路由名称
    component: Layout,
    redirect: "/home", // 重定向到子路由
    children: [
      {
        path: "/home",
        component: Home,
        meta: { title: "首页" },
      },
      // {
      //   path: "/member",
      //   component: Member,
      // },
    ], // 组件对象
  },
  {
    path: "/member",
    component: Layout,
    children: [
      {
        path: "/", // path: "/member/",
        component: Member,
        meta: { title: "会员管理" },
      },
    ],
  },
  {
    path: "/supplier",
    component: Layout,
    children: [
      {
        path: "/", // path: "/supplier/",
        component: Supplier,
        meta: { title: "供应商管理" },
      },
    ],
  },
  {
    path: "/goods",
    component: Layout,
    children: [
      {
        path: "/", // path: "/goods/",
        component: Goods,
        meta: { title: "商品管理" },
      },
    ],
  },
  {
    path: "/staff",
    component: Layout,
    children: [
      {
        path: "/", // path: "/staff/",
        component: Staff,
        meta: { title: "员工管理" },
      },
    ],
  },
  {
    path: "/login",
    name: "login", // 路由名称
    component: Login, // 组件对象
  },
];

const router = new VueRouter({
  // mode: "history", // 路由中显示 # hash 值
  base: process.env.BASE_URL,
  routes,
});

export default router;
