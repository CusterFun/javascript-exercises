// 引入 node 中的 path 模块，处理文件路径 的小工具
const path = require('path')

// 导出一个 webpack 具有特殊属性配置的对象
module.exports = {
  mode: 'none', // 指定模式配置："development" | "production" | "none"
  // 入口
  entry: './src/main.js', // 入口模块文件路径
  // 出口
  output: {
    // path: './dist/', 错误的，要指定绝对路径
    path: path.join(__dirname, './dist/'), //打包的结果文件生成的目录要是绝对路径
    filename: 'bundle.js'
  }
}