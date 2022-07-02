const router = require('express').Router();

const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');
const entry = require('./entry');

router.use(entry);

router.use(auth);

router.use(require('./users'));
router.use(require('./movies'));

router.use('*', (_, __, next) => next(new NotFoundError('Запрашиваемая страница не найдена')));

module.exports = router;
