## Node.js 的非阻塞 I/O

- I/O 即 Input/Output,一个系统的输入和输出
- 阻塞 I/O 和非阻塞 I/O 的区别就在于系统接收输入再到输出期间，能不能接收其他输入

举例

- 吃饭：排队打饭

排队→等前面的人打饭→轮到你打饭→吃饭

- 出去吃：餐厅点菜

坐下→点菜→等待→吃饭

- 排队打饭 vs 餐厅点菜

- 对于点菜人员：
  - 排队打饭是阻塞 I/O
  - 餐厅点菜是非阻塞 I/O
- 系统 = 食堂阿姨/ 服务生，输入 = 点菜，输出 = 端菜
- 饭堂阿姨只能一份一份饭地打 →阻塞 I/O
- 服务生点完菜之后可以服务其他客人 → 非阻塞 I/O

小芳帮妈妈做家务，需要做：用洗衣机洗衣服（20分钟）、扫地（10分钟）、整理书桌（10分钟）、晾衣服（5分钟）。你能不能设计一个巧妙合理的新顺序，使小芳最少花 多少 分钟可以完成这些事情？

理解非阻塞 I/O 的要点在于：

- 确定一个进行 Input/Output 的系统
- 思考在 I/O 过程中，能不能进行其他 I/O

```javascript
const glob = require('glob');

console.time('sync');
const result = glob.sync(__dirname + '/**/*');
console.timeEnd('sync');
console.log(result.length);

console.time('async');
const result2 = glob(__dirname + '/**/*', function (err, result) {
  console.log(result.length);
});
console.timeEnd('async');

// IO 完成之前还可以做别的事情
console.log('hello nodejs');
```

## Node.js 异步编程之 callback

```javascript
interview(function () {
  console.log('smile');
});

function interview(callback) {
  setTimeout(() => {
    callback('success');
  }, 500);
}
```

回调函数格式规范

- err-first callback
- None-style callback

第一个参数是 error，后面的参数才是结果

```javascript
// try catch只能抓到一个调用堆栈内，即一个事件循环里的错误
// try {
interview(function (res) {
  if (res instanceof Error) {
    return console.log('cry');
  }
  console.log('smile');
});
// } catch (e) {
//   console.log('cry', e);
// }

function interview(callback) {
  setTimeout(() => {
    if (Math.random() < 0.2) {
      callback('success');
    } else {
      // throw new Error('fail');
      callback(new Error('fail'));
    }
  }, 500);
}
```

- 异步流程控制
- npm: async.js

- thunk 编程范式

```javascript
interview(function (err, res) {
  if (err) {
    return console.log('cry at 1st round');
  }
  interview(function (err, res) {
    if (err) {
      return console.log('cry at 2st round');
    }
    interview(function (err, res) {
      if (err) {
        return console.log('cry at 3st round');
      }
      console.log('smile');
    });
  });
});

function interview(callback) {
  setTimeout(() => {
    if (Math.random() > 0.2) {
      callback(null, 'success');
    } else {
      callback(new Error('fail'));
    }
  }, 500);
}
```

## 异步：事件循环

```javascript
const eventLoop = {
  queue: [],
  timeoutqueue: [],
  fsqueue: [],

  loop() {
    while (this.queue.length) {
      const callback = this.queue.shift();
      callback();
    }
    this.fsqueue.forEach(callback => {
      if (done) {
        callback();
      }
    });
    setTimeout(this.loop.bind(this), 50);
  },
  add(callback) {
    this.queue.push(callback);
  }
}

eventLoop.loop();

setTimeout(() => {
  eventLoop.add(function () {
    console.log(1);
  })
}, 500);
setTimeout(() => {
  eventLoop.add(function () {
    console.log(2);
  })
}, 800);
```

## Node.js 异步编程 Promise

- 当前事件循环得不到的结果，但未来的事件循环会给到你结果
- 是一个状态机
  - pending
  - fulfilled/resolved （value）
  - rejected（error）

查看 Promise 的状态

```javascript
const promise = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve();
    // reject(new Error());
  }, 300);
});

console.log(promise);

setTimeout(() => {
  console.log(promise);
}, 800);
```

Promise 的 resolved 和 rejected 之间不能相互转换

```javascript
(function () {
  const promise = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve();
    }, 300);
    setTimeout(() => {
      reject(new Error());
    }, 500);
  });

  console.log(promise);

  setTimeout(() => {
    console.log(promise);
  }, 800);
})();
```

`.then` 和 `.catch` 

- resolved 状态的 Promise 会回调后面的第一个 .then
- rejected 状态的 Promise 会回调后面的第一个 .catch
- 任何一个 rejected 状态且后面没有 .catch 和 Promise，都会造成 浏览器/Node环境的全局错误

```javascript
(function () {
  const promise = new Promise(function (resolve, reject) {
    setTimeout(() => {
      // resolve(3);
      reject(new Error('4'));
    }, 300);
  }).then(function (res) {
    // 进入 resolved 状态
    console.log(res);
  }).catch(function (err) {
    console.log(err);
  });

  console.log(promise);

  setTimeout(() => {
    console.log(promise);
  }, 800);
})();
```

使用 Promise 改进 interview 代码

```javascript
(function () {
  let promise = interview();
  promise.then((res) => {
    console.log('smile');
  }).catch((err) => {
    console.log('cry');
  });
})()

function interview() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) {
        resolve('success'); // resolve 和 reject 都只能接受一个参数
      } else {
        reject(new Error('fail'));
      }
    }, 500);
  });
}
```

Promise 的优势

```javascript
(function () {
  let promise = interview();
  let promise2 = promise
    .then((res) => {
      // throw new Error('refuse');
      return 'accept';
    });

  setTimeout(() => {
    console.log(promise);
    console.log(promise2);
  }, 800);

  function interview() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.2) {
          resolve('success'); // resolve 和 reject 都只能接受一个参数
        } else {
          reject(new Error('fail'));
        }
      }, 500);
    });
  }
})()
```

```javascript
(function () {
  let promise = interview();
  let promise2 = promise
    .catch((res) => {
      return 'accept';
    });

  setTimeout(() => {
    console.log(promise);
    console.log(promise2);
  }, 800);

  function interview() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 1) {
          resolve('success'); // resolve 和 reject 都只能接受一个参数
        } else {
          reject(new Error('fail'));
        }
      }, 500);
    });
  }
})()
```

总结：

执行 then 和catch 会返回一个新的 Promise，该 Promise 最终状态根据 then 和 catch 的回调函数的执行结果决定。

- 如果回调函数最终是throw，该 Promise 是 rejected 状态
- 如果回调函数最终是 return，该 Promise 是 resolved 状态
- 但如果回调函数最终 return 了一个 Promise，该 Promise 会和回调函数 return 的 Promise 状态保持一致

```javascript
(function () {
  let promise = interview();
  let promise2 = promise
    .then((res) => {
      return new Promise(function (resolve, reject) {
        setTimeout(() => {
          resolve('accept');
        }, 300);
      });
    });

  setTimeout(() => {
    console.log(promise);
    console.log(promise2);
  }, 800);

  setTimeout(() => {
    console.log(promise);
    console.log(promise2);
  }, 1000);


  function interview() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0) {
          resolve('success'); // resolve 和 reject 都只能接受一个参数
        } else {
          reject(new Error('fail'));
        }
      }, 500);
    });
  }
})()

// Promise { 'success' }
// Promise { <pending> }
// Promise { 'success' }
// Promise { 'accept' }

```

使用 Promise 写多轮面试

```javascript
(function () {
  const proise = interview(1)
    .then(() => {
      return interview(2)
    })
    .then(() => {
      return interview(3);
    })
    .then(() => {
      console.log('smile');
    })
    .catch((err) => {
      console.log('cry at ' + err.round + 'st round');
    });

  function interview(round) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.4) {
          resolve('success')
        } else {
          var err = new Error('fail');
          err.round = round;
          reject(err);
        }
      }, 500);
    });
  }
})();
```

使用 Promise.all 完成并发异步

```javascript
(function () {
  Promise.all([
    interview('baidu'),
    interview('tencent')
  ]).then(() => {
    console.log('smile');
  }).catch((err) => {
    console.log('cry for ' + err.name);
  });


  function interview(name) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.4) {
          resolve('success')
        } else {
          var err = new Error('fail');
          err.name = name;
          reject(err);
        }
      }, 500);
    });
  }
})();
```

## 异步：async/await

- async function 是 Promise 的语法糖封装
- 异步编程的终极方案 - 以同步的方式写异步
  - await 关键字可以“暂停” async function 的执行
  - await 关键字可以以同步的写法获取 Promise 的执行结果
  - try-catch 可以获取 await 所得到的错误
- 一个穿越事件循环存在的 function

```javascript
console.log(async function f() {

});
// [AsyncFunction: f]

console.log(function () {
  return new Promise(resolve => {
    resolve();
  });
});
// [Function]

console.log(async function f() {

}());
// Promise { undefined }

console.log(function () {
  return new Promise(resolve => {
    resolve();
  });
}());
// Promise { undefined }

console.log(async function f() {
  return 4;
}());
// Promise { 4 }

console.log(function () {
  return new Promise(resolve => {
    resolve(4);
  });
}());
// Promise { 4 }

console.log(async function f() {
  throw new Error('4');
}());
// Promise {<rejected>: Error: 4}

console.log(function () {
  return new Promise((resolve, reject) => {
    reject(new Error('4'));
  });
}());
// Promise {<rejected>: Error: 4}
```

await 关键字可以“暂停”async function 的执行

```javascript
(function () {
  const result = async function () {
    let content = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 500);
    })
    console.log(content);
    return 4;
  }();

  setTimeout(() => {
    console.log(result);
  }, 800);
})()
// Promise{<pending>}
// undefined
// Promise{<fulfilled>: 4}
```

Await 关键字可以以同步的写法获取 Promise 的执行结果

```javascript
(function () {
  const result = async function () {
    let content = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(6);
      }, 500);
    })
    console.log(content);
    return 4;
  }();

  setTimeout(() => {
    console.log(result);
  }, 800);
})()
// 6
// Promise { 4 }
```

try-catch 可以获取 await 所得到的错误

```javascript
(function () {
  const result = async function () {
    try {
      let content = await new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('8'));
        }, 500);
      })
    } catch (e) {
      console.log('error', e.message);
    }
    console.log(content);
    return 4;
  }();

  setTimeout(() => {
    console.log(result);
  }, 800);
})()
// error 8
// Promise{<fulfilled>: 4}
```

改造面试代码

```javascript
(async function f() {
  try {
    await interview(1);
    await interview(2);
    await interview(3);
  } catch (e) {
    return console.log('cry at ' + e.round + 'st round');
  }
  console.log('smile');
})()

function interview(round) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.4) {
        resolve('success')
      } else {
        var err = new Error('fail');
        err.round = round;
        reject(err);
      }
    }, 500);
  });
}
```

并行异步

```javascript
(async function f() {
  try {
    await Promise.all([
      interview(1),
      interview(2),
      interview(3)
    ]);
  } catch (e) {
    return console.log('cry at ' + e.round + 'st round');
  }
  console.log('smile');
})()

function interview(round) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.4) {
        resolve('success')
      } else {
        var err = new Error('fail');
        err.round = round;
        reject(err);
      }
    }, 500);
  });
}
```

一个穿越事件循环存在的 function

