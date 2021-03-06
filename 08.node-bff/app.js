import Koa from 'koa';
import ip from 'ip';
import conf from './config';
import router from './router';
import middleware from './middleware';

const app = new Koa();
middleware(app);
router(app);
app.listen(conf.port, '0.0.0.0', () => {
  console.log(`server is running at ${ip.address()}:${conf.port}`);
});