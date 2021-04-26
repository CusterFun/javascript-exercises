const data = require('../../backend/mockdata/column');

module.exports = async function (sortType = 0, filtType = 0) {
  return data
    .sort((a, b) => {
      if (sortType === 1) {
        return a.id - b.id;
      } else if (sortType === 2) {
        return a.sub_count - b.sub_count;
      } else if (sortType === 3) {
        return a.column_price - b.column_price;
      }
    })
    .filter((item) => {
      if (filtType === 0) {
        return item
      } else {
        return item.type === filtType
      }
    })
}