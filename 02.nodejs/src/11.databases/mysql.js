const mysql = require('mysql');
const uuid = require('uuid');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root1234',
  database: 'test'
});

connection.connect((err) => {
  if (err) throw err;
  else {
    console.log('connection successful');

    const userId = uuid.v1();
    const username = 'nihao';
    const real_name = 'zhangsan';
    const age = 30;
    const address = 'shanghai';

    connection.query('insert into member set ?', {
      id: userId,
      username: username,
      real_name: real_name,
      age: age,
      address: address
    }, (err, result) => {
      if (err) {
        console.log('insert error occurred: ' + err);
        throw err;
      } else {
        console.log(result);

        connection.query('select * from member', (err, result) => {
          if (err) {
            console.log('select error occurred: ' + err);
            throw err;
          } else {
            console.log(result);

            connection.end((err) => {
              if (err) {
                console.log('end error occurred');
                throw err;
              }
            });
          }
        });
      }
    });
  }
});

/*
CREATE TABLE `member`  (
  `id` varchar(40) NOT NULL COMMENT '主键',
  `username` varchar(50) DEFAULT NULL COMMENT '用户名',
  `real_name` varchar(50) DEFAULT NULL COMMENT '真实用户名',
  `age` int NOT NULL COMMENT '年龄',
  `address` varchar(50) DEFAULT NULL COMMENT '地址',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COMMENT = '用户表';
 */