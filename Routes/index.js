const {Router} = require('express');
const router = Router();

const healthCheckRoute = require('./healthCheck.routes');
router.use('/', healthCheckRoute);

const exampleRoutes = require('./example.routes');
router.use('/example', exampleRoutes);

const categoriesRouter = require('./Categories.routes');
router.use('/categories', categoriesRouter);

const usersRoutes = require('./Users.routes');
router.use('/users', usersRoutes);

module.exports = router;





