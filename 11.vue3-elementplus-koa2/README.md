# Vue3+ElementPlus+Koa2 全栈开发后台系统
## 第一章 项目规划
### 第一节：项目开发流程
#### 团队组成&分工
产品、前端、Android/IOS、后端、测试、
UED(设计)、运维、运营、大数据、算法
#### 项目开发整体流程
需求 → 开发 → 测试 → 上线 → 回顾
- 需求：需求调研、需求设计、需求评审、用例评审
- 开发：接口设计、接口评审、前后端开发、CR、自测
- 测试：Bug修复、功能优化、需求调整、遗漏功能开发
- 上线：预发验证、灰度测试、checklist、权限配置、版本回退
- 回顾：事故复盘、问题总结、数据总览
### 第二节：如何理解通用后台
Vue3、ElementPlus、Node/Koa2、Mongo
通用？通用模块和通用后台？
Element、AntD、Mint、Vant、WeUI
Vue、React、Angular、JQuery
cookie、swiper、lodash、Underscore
Antd-Pro、Vue-admin、Egg
- 掌握后台开发的共性
- 开发通用模块
- 开发通用架构
- 掌握常用技能、开发技巧、语法
全栈、Vue3全家桶、ElementPlus、标准前后端架构、CRUD、JWT、RBAC权限、审批流、动态菜单
### 第三节：本项目需求介绍
需求 → 开发 → 测试 → 上线 → 回顾
- 需求调研
- 需求设计
- 需求评审（交互评审、技术评审）
- 工期评估（开发）
- 后台管理系统
- 技术栈选型（Vue3全家桶+Node+Mongo）
- 技术评审：权限、审批流
- 交互评审：统一页面接口
### 第四节：Vue3直通车
Vue@3.0、Vue-Router@4.0、Vuex@4.0
Vue3:
- 更小
	- 全局 API 和内置组件/功能支持 tree-shaking
	- 核心代码尺寸控制在 10kb gzipped 上下
- 更快
	- 基于 Proxy 的变动侦测，性能整体优于 getter/setter
	- Virtual DOM 重构：
		- 传统 VDOM Diff 算法对比的颗粒度是组件，
			- 单个组件内，需要遍历整个 DOM 树（注：实际开发中，大量的节点都是静态节点）
		- VDOM 优化（增加静态标记、静态提升、事件缓存）
- 加强 API 设计一致性
	- Function-based API → Composition API
	- 定义响应式：ref/reactive
	- 入口函数：setup
	- 钩子函数：computed/onMounted
	- 上下文：getCurrentInstance/globalProperties
- 加强 TypeScript 支持
	- 3.0 本身用 TypeScript 重写，内置 typing 优化（增加静态标记）
	- TSX 支持
	- 不会影响不适用 TS 的用户
- 提高自身可维护性
	- 代码采用 monorepo 结构，内部分层更清晰
- 开发更多底层功能
- Vite：一个基于浏览器原生 ES imports 的开发服务器
	- 利用浏览器去解析 imports，在服务器端按需编译返回，完全跳过了打包了这个概念，服务器随起随用。同时不仅有 Vue 文件支持，还搞定了热更新，而且热更新的速度不会随着模块增多而变慢。针对生产环境则可以把同一份代码用 rollup 打包。

## 第二章 前端架构设计
### 第一节：项目初始化--全局Vue脚手架&Vite创建项目
#### Node 环境安装
http://nodejs.cn
#### 全局安装 vue 脚手架
```bash
npm install -g @vue/cli
# or
cnpm install -g @vue/cli
# or
yarn global add @vue/cli
```
官方文档：https://cli.vuejs.org/zh/guide/
版本查看：`vue --version`
版本升级：`npm update -g @vue/cli` 或 `yarn global upgrade --latest @vue/cli`
创建项目：`vue create manager-fe`
#### 通过vite创建项目
官方文档：https://cn.vitejs.dev
创建项目：
```bash
npm init @vitejs/app
# or
cnpm init @vitejs/app
# or
yarn create @vitejs/app manager-fe
```
安装项目所需插件
```bash
# 安装项目生成依赖
yarn add vue-router@next vuex@next element-plus axios -S
# 安装项目开发依赖
yarn add sass -D
```
> element-plus 文档： https://element-plus.org/#/zh-CN/component/quickstart

### 第二节：项目初始化--插件安装 
#### VSCode 插件
```bash
Eslint
Vetur
TypeScript
Prettier
```
### 第三节：目录结构规范 
```bash
├── src
│   ├── api
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   └── HelloWorld.vue
│   ├── config
│   ├── main.js
│   ├── router
│   ├── store
│   ├── utils
│   ├── views
│   └── App.vue
├── public
│   └── favicon.ico
├── .env.dev
├── .env.prod
├── .env.test
├── .gitignore
├── package.json
├── vite.config.js
└── yarn.lock
```
### 第四节：路由封装（上） 
路由跳转的三种方式
router-link
```js
<router-link to\="/login"\>去登陆</router-link\>
```
传统跳转
```vue
<template>
 <div>欢迎来到登录页面</div>
 <el-button @click="goHome">回首页</el-button>
</template>
<script>
export default {
  name: 'login',
  methods: {
    goHome() {
      this.$router.push('/welcome')
    }
  }
}
</script>
```
Componsition API 跳转

```vue
<template>
 <div>欢迎来到登录页面</div>
 <el-button @click="goHome">回首页</el-button>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goHome = () => {
  router.push('/welcome')
}
</script>
```

### 第五节：路由封装（下） 

### 第六节：环境配置 
### 第七节：axios二次封装（上） 
### 第八节：axios二次封装（下） 
### 第九节：storage二次封装 
### 第十节：主页结构布局

## 第三章  Koa架构设计

### 3-6 Mac下Mongo安装和配置

1. 下载 [MongoDB Community Download | MongoDB](https://www.mongodb.com/try/download/community) 解压到指定目录下
2. 解压后创建文件夹如下

```bash
└── mongodb-macos-x86_64-4.4.6
  ├── LICENSE-Community.txt
  ├── MPL-2
  ├── README
  ├── THIRD-PARTY-NOTICES
  ├── bin
  │  ├── install_compass
  │  ├── mongo
  │  ├── mongod
  │  └── mongos
  └── mongo
    ├── conf
    │  └── mongo.conf
    ├── data
    └── log
      └── mongo.log
```

3. 写 mongo/conf/mongo.conf 文件内容

```bash
#数据库路径
dbpath=~/Work/install-soft/mongodb-macos-x86_64-4.4.6/mongo/data
#日志输出文件路径
logpath=~/Work/install-soft/mongodb-macos-x86_64-4.4.6/mongo/log/mongo.log
#错误日志采用追加模式
logappend=true
#启用日志文件，默认启用
journal=true
#这个选项可以过滤掉一些无用的日志信息，若需要调试使用请设置为false
quiet=true
#端口好 默认为27017
port=27017
#auth=true
fork=true%
```

4. 挂载

```bash
ln -s ~/Work/install-soft/mongodb-macos-x86_64-4.4.6/bin/mongod /usr/local/bin/mongod
ln -s ~/Work/install-soft/mongodb-macos-x86_64-4.4.6/bin/mongo /usr/local/bin/mongo
```

5. 启动 mongo

```bash
mongod --config ~/Work/install-soft/mongodb-macos-x86_64-4.4.6/mongo/conf/mongo.conf
```

### 3-8 Mongo基础入门 

| SQL                 | Mongo              |
| ------------------- | ------------------ |
| 表（Table）         | 集合（Collection） |
| 行（Row）           | 文档（Document）   |
| 列（Col）           | 字段（Field）      |
| 主键（Primary Key） | 对象ID（ObjectId） |

#### 数据库操作

| 描述       | 命令              |
| ---------- | ----------------- |
| 创建数据库 | use demo          |
| 查看数据库 | show dbs          |
| 删除数据库 | db.dropDatabase() |

#### 集合操作

| 描述     | 命令                      |
| -------- | ------------------------- |
| 创建集合 | db.createCollection(name) |
| 查看集合 | show collections          |
| 删除集合 | db.collection.drop()      |

#### 文档操作

| 描述     | 命令                                                         |
| -------- | ------------------------------------------------------------ |
| 创建文档 | db.collection.insertOne({}) / db.collection.insertMany({})   |
| 查看文档 | db.collections.find({})                                      |
| 删除文档 | db.collection.deleteOne() / db.collection.deleteMany()       |
| 更新文档 | db.collection.update({}, {}, false, true) 第3个参数是没有找到是否创建新的，第4个参数是否批量更新，默认只更新找到的第一个 |

#### 条件操作

| 描述     | 命令 |
| -------- | ---- |
| 大于     | $gt  |
| 小于     | $lt  |
| 大于等于 | $gte |
| 小于等于 | $lte |

### 3-10 接口文档设计

#### 后端开发

- 理解需求
- 关键功能技术评审
- 设计表结构
- 设计接口文档
- 接口功能实现
- 接口联调、自测、提测

