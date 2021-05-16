const Router = require('@koa/router');

const router = new Router({ prefix: '/todo' });

const {
  find, create, update, delete: del
} = require('../controller/todo');

router.get('/', find);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', del);

module.exports = router;