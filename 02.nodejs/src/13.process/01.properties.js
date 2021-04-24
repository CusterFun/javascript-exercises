console.log(process.version); // node 版本
console.log(process.versions); // 详细运行版本信息
console.log(process.platform); // 运行平台版本
console.log(process.execPath); // 执行路径
console.log(process.config); // 配置信息
console.log(process.pid); // 执行的 node 进行 id
console.log(process.title); // returns the current process title
console.log(process.arch); // The operating system CPU architecture
console.log(process.memoryUsage()); // Returns an object describing the memory usage of the Node.js process measured in bytes.
/**
 * {
  rss: 19501056, 进程总的内存占用量
  heapTotal: 4907008, v8分配总的堆的大小
  heapUsed: 2898048, v8使用总的堆的大小
  external: 925265, 堆外内存
  arrayBuffers: 9382
}

 */
console.log(process.cwd()); // 当前运行的工作目录
process.chdir('../'); // 切换当前工作目录
console.log(process.cwd()); // 查看当前工作目录
console.log(process.env); // 当前操作系统中定义的环境变量
process.env.NODE_ENV = 'dev';
console.log(process.uptime()); // 当前进程的执行时间
process.on('exit', () => { // 监听进程退出，执行回调
  console.log('node process exited');
});
// process.exit(0);
process.on('beforeExit', () => { // 进行退出之前，执行回调
  console.log('node process before exited');
});
// 主线程未捕获的异常
process.on('uncaughtException', (err) => {
  console.log(err);
  console.log('=========')
  console.log('uncaughtException occurred');
});
// a
// 监听操作系统信号
process.on('SIGINT', () => {
  console.log('received SIGINT info');
});
setTimeout(() => {
  console.log('timeout');
}, 1000000);