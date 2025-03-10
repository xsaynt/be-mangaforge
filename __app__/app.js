const express = require('express');
const cors = require('cors');
const apiRouter = require('../routers/api-router.js');
const {
	postgresErrorHandler,
	customErrorHandler,
	serverErrorHandler,
} = require('../error.js');

const app = express();
app.use(express.json(), cors());

app.use('/api', apiRouter);

app.use(postgresErrorHandler);
app.use(customErrorHandler);
app.use(serverErrorHandler);

module.exports = app;
