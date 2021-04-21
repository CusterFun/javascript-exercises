const myModule2 = {
    myInfo: {
        name: 'zhangsan',
        age: 20
    },
    myFunction: function (inputNumber) {
        return inputNumber + 5;
    }
};

// exports.myModule2 = myModule2; // 自定义命名导出
module.exports = myModule2; // 整体导出