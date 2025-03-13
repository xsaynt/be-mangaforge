const express = require('express');
const {
	getAllBaskets,
	getSingleBasket,
} = require('../controllers/basket-controller');

const basketRouter = express.Router();

basketRouter.get('/', getAllBaskets);
basketRouter.get('/:basket_id', getSingleBasket);

module.exports = basketRouter;
