const express = require('express');
const {
	getAllBaskets,
	getSingleBasket,
	postNewItem,
	updateBasketItem,
	deleteSingleManga,
} = require('../controllers/basket-controller');

const basketRouter = express.Router();

basketRouter.get('/', getAllBaskets);
basketRouter.get('/:basket_id', getSingleBasket);
basketRouter.post('/:basket_id', postNewItem);
basketRouter.patch('/:basket_id', updateBasketItem);
basketRouter.delete('/:basket_id', deleteSingleManga);

module.exports = basketRouter;
