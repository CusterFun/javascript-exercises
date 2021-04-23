const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/mytest';

mongoose.connect(uri, {user: 'admin', pass: '123456', userNewUrlParse: true, useUnifiedTopology: true}, (err) => {
  if (err) {
    console.log(err);
    throw err;
  } else {
    console.log('connection successful');

    // 嵌套文档，先定义里层，再定义外层
    // 1. 先定义
    const parentSchema = new mongoose.Schema({
      name: String,
      age: Number,
      address: String,
    });

    const studentSchema = new mongoose.Schema({
      name: String,
      age: Number,
      address: String,
      married: Boolean,
      parents: parentSchema
    });
    // 2. 通过 mongoose 构造 schema
    mongoose.model('student', studentSchema);
    // 3. 获取 schema 的实例
    const Student = mongoose.model('student');
    // 4. new 该实例
    const student = new Student({
      name: 'zhangsan',
      age: 20,
      address: 'shanghai',
      married: false,
      parents: {
        name: 'lisi',
        age: 50,
        address: 'beijing'
      }
    });
    // 5. 使用该实例
    student.save((err) => {
      if (err) {
        console.log(err);
        throw err;
      } else {
        console.log('save successful');

        Student.find({}, (err, docs) => {
          if (err) {
            console.log(err);
            throw err;
          } else {
            console.log(docs);
            mongoose.connection.close();
            // docs.forEach(doc => {
            //   doc.remove();
            // });
          }
        });
      }
    });
  }
});