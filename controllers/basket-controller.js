const {
	selectAllBaskets,
	selectSingleBasket,
	addToBasket,
	updateQuantity,
	deleteMangaFromBasket,
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
	const { manga_title, manga_author, manga_img, price, quantity } = req.body;

	try {
		const newItem = await addToBasket(basket_id, {
			manga_title,
			manga_author,
			manga_img,
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
	const { inc_quantity, manga_title } = req.body;

	try {
		const updatedBasket = await updateQuantity(basket_id, {
			inc_quantity,
			manga_title,
		});
		if (!updatedBasket) {
			res.status(404).send({ msg: 'Not Found' });
		} else {
			res.status(200).send(updatedBasket);
		}
	} catch (error) {
		next(error);
	}
};

exports.deleteSingleManga = async (req, res, next) => {
	const { basket_id } = req.params;
	const { manga_title } = req.body;

	try {
		const remainingBasket = await deleteMangaFromBasket(basket_id, {
			manga_title,
		});

		if (!remainingBasket) {
			res.status(404).send({ msg: 'Not Found' });
		}

		res.status(200).send(remainingBasket);
	} catch (error) {
		next(error);
	}
};
