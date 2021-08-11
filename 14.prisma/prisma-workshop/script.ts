import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// A `main` function so that you can use async/await
async function main() {
  // ... you will write your Prisma Client queries here
  // const findRes = await prisma.user.findMany();
  // console.log('findRes: ', findRes);

  // const createRes = await prisma.user.create({
  //   data: {
  //     email: '4@qq.com',
  //   },
  // });
  // console.log('createRes: ', createRes);

  // const updateRes = await prisma.user.update({
  //   where: {
  //     email: '4@qq.com',
  //   },
  //   data: {
  //     name: '六六',
  //   }
  // });
  // console.log('updateRes: ', updateRes);

  // 创建文章
  // const postRes = await prisma.post.create({
  //   data: {
  //     title: 'hello',
  //   }
  // });
  // console.log('postRes: ', postRes);

  // 更新文章作者
  // const authorRes = await prisma.post.update({
  //   where: {
  //     id: 1,
  //   }, data: {
  //     author: {
  //       connect: { email: '4@qq.com'},
  //     },
  //   }
  // });
  // console.log('authorRes: ', authorRes);

  // 查询user
  // const userRes = await prisma.user.findUnique({
  //   where: { email: '4@qq.com' },
  // });
  // console.log('userRes: ', userRes);

  // 查询用户文章 关联关系的嵌套查询
  // const userPostRes = await prisma.user.findUnique({
  //   where: { email: '4@qq.com' },
  //   include: { posts: true },
  // });
  // console.log('userPostRes: ', userPostRes);

  // const userSelectRes = await prisma.user.findMany({
  //   select: {
  //     id: true,
  //     name: true,
  //   }
  // });
  // console.log('userSelectRes: ', userSelectRes);

  // 创建用户时同时创建文章
  // const userPostCreateRes = await prisma.user.create({
  //   data: {
  //     name: 'Custer',
  //     email: "custer@qq.com",
  //     posts: {
  //       create: { // 同时创建用 create
  //         title: 'Self introduction',
  //         content: '2',
  //       },
  //     },
  //   },
  // });
  // console.log('userPostCreateRes: ', userPostCreateRes);
  
  // 过滤查询
  // const filterRes = await prisma.user.findMany({
  //   where: {
  //     name: {
  //       startsWith: 'c' // 名字以4开头的
  //     },
  //   },
  // });
  // console.log('filterRes: ', filterRes);

  // 分页查询
  const skipRes = await prisma.user.findMany({
    skip: 2, take: 2,
  });
  console.log('skipRes: ', skipRes);

}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
