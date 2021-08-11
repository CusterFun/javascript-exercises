import { PrismaClient } from '@prisma/client';
import express, { json } from 'express';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get('/users', async (req, res) => {
  const result = await prisma.user.findMany();
  res.json(result);
});

app.post('/signup', async(req, res) => {
  const { name, email } = req.body;
  const result = await prisma.user.create({ data: { name, email }});
  res.json(result);
});

app.post('/post', async(req, res) => {
  const { title, content, authorEmail } = req.body;
  const result = await prisma.post.create({ 
    data: {
      title,
      content,
      author: {
        connect: {
          email: authorEmail,
        },
      },
    },
  });
  res.json(result);
});

app.put('/post/:id/views', async(req, res) => {
  const { id } = req.params;
  const result = await prisma.post.update({
    where: { id: Number(id) }, data: {
      viewCount: {
        increment: 1, // 自动加1
      },
    },
  });
  res.json(result);
});

// 发布文章
app.put('/publish/:id', async(req, res) => {
  const { id } = req.params;
  const result = await prisma.post.update({
    where: {
      id: Number(id),
    }, data: {
      published: true,
    },
  });
  res.json(result);
});

// 关联查询 级联操作 链式调用
app.get('/user/:id/drafts', async(req, res) => {
  const { id } = req.params;
  const result = await prisma.user.findUnique({
    where: { id: Number(id) }, // 查询指定用户的草稿
  }).posts({
    where: {
      published: false, // 查询未发布的文章
    },
  });
});

app.get(`/post/:id`, async(req, res) => {
  const { id } = req.params;
  const result = await prisma.post.findUnique({
    where: { id: Number(id) }, // 查询指定文章
  });
  res.json(result);
});

// 获取所有已发布的文章
app.get('/feed', async (req, res) => {
  // 查询参数和分页
  const { searchString, skip, take } = req.query;
  const or = searchString
    ? {
      OR: [
        { title: { contains: searchString as string } },
        { content: { contains: searchString as string } },
      ],
    }
    : {};
  const result = await prisma.post.findMany({
    where: {
      published: true,
    },
    skip: Number(skip) || undefined,
    take: Number(take) || undefined,
  });
  res.json(result);
});

app.listen(3001, () => {
  console.log('Listening on http://localhost:3001');
});
