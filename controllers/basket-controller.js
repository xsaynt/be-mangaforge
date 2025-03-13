const {
	selectAllBaskets,
	selectSingleBasket,
} = require('../models/basket-model');

exports.getAllBaskets = async (req, res, next) => {
	try {
		const baskets = await selectAllBaskets();
		res.status(200).send({ baskets });
	} catch (error) {
		next(error);
	}
};

exports.getSingleBasket = async (req, res, next) => {
	const basket_id = req.params.basket_id;

	try {
		const basket = await selectSingleBasket(basket_id);
		if (basket.length === 0) {
			return res.status(404).send({ msg: 'Not Found' });
		}
		res.status(200).send(basket);
	} catch (error) {
		next(error);
	}
};
