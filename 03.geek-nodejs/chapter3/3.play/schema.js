const {graphql, buildSchema} = require("graphql");

const schema = buildSchema(`
  type Comment {
    id: Int
    avatar: String
    name: String
    isTop: Boolean
    content: String
    publishDate: String
    commentNum: Int
    praiseNum: Int
  }
  type Query {
    comment: [Comment]
  }
  type Mutation {
    praise(id: Int):Int
  }
`);

schema.getQueryType().getFields().comment.resolve = () => {
  return Object.keys(mockDatabase).map(key => {
    return mockDatabase[key];
  })
}

schema.getMutationType().getFields().praise.resolve = (arg0, {id}) => {
  mockDatabase[id].praiseNum++;
  return mockDatabase[id].praiseNum;
}
module.exports = schema;

const mockDatabase = {
  1: {
    id: 1,
    avatar: 'https://static001.geekbang.org/account/avatar/00/0f/52/62/1b3ebed5.jpg',
    name: '学习 Node',
    isTop: true,
    content: '哈哈啊',
    publishDate: '今天',
    commentNum: 10,
    praiseNum: 5,
  },
  2: {
    id: 1,
    avatar: 'https://static001.geekbang.org/account/avatar/00/0f/52/62/1b3ebed5.jpg',
    name: '学习 Go',
    isTop: true,
    content: '哈哈啊',
    publishDate: '今天',
    commentNum: 10,
    praiseNum: 5,
  },
  3: {
    id: 3,
    avatar: 'https://static001.geekbang.org/account/avatar/00/0f/52/62/1b3ebed5.jpg',
    name: '学习 Serverless',
    isTop: true,
    content: '哈哈啊',
    publishDate: '今天',
    commentNum: 10,
    praiseNum: 5,
  }
}