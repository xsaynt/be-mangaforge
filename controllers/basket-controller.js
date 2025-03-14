const {
	selectAllBaskets,
	selectSingleBasket,
	addToBasket,
	updateQuantity,
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

exports.postNewItem = async (req, res, next) => {
	const { basket_id } = req.params;
	const { item_title, item_author, item_image, price, quantity } = req.body;

	try {
		const newItem = await addToBasket(basket_id, {
			item_title,
			item_author,
			item_image,
			price,
			quantity,
		});
		res.status(201).send(newItem);
	} catch (error) {
		next(error);
	}
};

exports.updateBasketItem = async (req, res, next) => {
	const { basket_id } = req.params;
	const { inc_quantity, item_title } = req.body;

	try {
		const updatedBasket = await updateQuantity(basket_id, {
			inc_quantity,
			item_title,
		});
		res.status(200).send(updatedBasket);
	} catch (error) {
		next(error);
	}
};
