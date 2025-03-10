const { selectAllBaskets } = require('../models/basket-model');

exports.getAllBaskets = async (req, res, next) => {
	try {
		const baskets = await selectAllBaskets();
		res.status(200).send({ baskets });
	} catch (error) {
		next(error);
	}
};
