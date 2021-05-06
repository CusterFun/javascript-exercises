const Mock = require('mockjs')
const data = Mock.mock({
  'empList|6': [
    {
      'id|+1': 1,
      'name': '@cname', //'@string',
      'price': '@float',
      'status': '@boolean',
      'birthday': '@date("yyyy/MM/dd")',
      'createDate': '@datetime("yyyy/MM/dd HH:mm:ss")',
      'pic': "@image",
      'title': '@title',
      'ctitle': '@ctitle(10, 30)',
      'content': '@csentence(100, 500)',
      'first': '@cfirst',
      'last': '@clast',
      'url': '@url("http", "mengxuegu.com")',
      "domain": '@domain',
      'ip': '@ip',
      "area": "@region",
      "address": "@county(true)",
      'zipCode': '@zip',
      'phone|11': '@integer(0, 9)'
    }
  ]
})

console.log(JSON.stringify(data, null, 2))