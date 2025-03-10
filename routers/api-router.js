const express = require('express');
const homeController = require('../controllers/home-controller.js');
const basketRouter = require('./basket-router.js');
const favouritesRouter = require('./favourites-router.js');
const historyRouter = require('./history-router.js');
const usersRouter = require('./users-router.js');

const apiRouter = express.Router();

apiRouter.get('/', homeController);
apiRouter.use('/basket', basketRouter);
apiRouter.use('/favourites', favouritesRouter);
apiRouter.use('/history', historyRouter);
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
