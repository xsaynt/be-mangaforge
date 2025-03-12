import app from '../__app__/app.js';
const express = require('express');
const dotenv = require('dotenv');
const authRouter = require('../routers/auth-router.js');

dotenv.config();

app.use(express.json());

app.use('/.', authRouter);

const { PORT = 9090 } = process.env;

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
