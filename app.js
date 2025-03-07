import express from 'express';
import cors from 'cors';
import apiRouter from './routers/api-router.js';
import {
	postgresErrorHandler,
	customErrorHandler,
	serverErrorHandler,
} from './error.js';
const app = express();

app.use(express.json(), cors());

app.use('/api', apiRouter);

app.use(postgresErrorHandler);
app.use(customErrorHandler);
app.use(serverErrorHandler);

export default app;
