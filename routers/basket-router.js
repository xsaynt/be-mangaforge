const express = require('express');
const { getAllBaskets } = require('../controllers/basket-controller');

const basketRouter = express.Router();

basketRouter.get('/', getAllBaskets);

module.exports = basketRouter;
