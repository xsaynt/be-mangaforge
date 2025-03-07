import express from 'express';
import cors from 'cors';
import apiRouter from './routers/api-router';
import {
	postgresErrorHandler,
	customErrorHandler,
	serverErrorHandler,
} from './error';
const app = express();

app.use(express.json(), cors());

app.use('/api', apiRouter);

app.use(postgresErrorHandler);
app.use(customErrorHandler);
app.use(serverErrorHandler);

export default app;
