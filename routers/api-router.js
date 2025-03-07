import express from 'express';
import basketRouter from './basket-router.js';
import favouritesRouter from './favourites-router.js';
import historyRouter from './history-router.js';
import usersRouter from './users-router.js';

const apiRouter = express.Router();

apiRouter.use('/basket', basketRouter);
apiRouter.use('/favourites', favouritesRouter);
apiRouter.use('/history', historyRouter);
apiRouter.use('/users', usersRouter);

export default apiRouter;
