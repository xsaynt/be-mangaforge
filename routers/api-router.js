import basketRouter from './basket-router';
import favouritesRouter from './favourites-router';
import historyRouter from './history-router';
import mangaRouter from './manga-router';
import usersRouter from './users-router';

const apiRouter = require('express').Router();

apiRouter.use('/basket', basketRouter);
apiRouter.use('/favourites', favouritesRouter);
apiRouter.use('/history', historyRouter);
apiRouter.use('/manga', mangaRouter);
apiRouter.use('/users', usersRouter);

export default apiRouter;
