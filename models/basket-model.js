const db = require('../db/connection');

exports.selectAllBaskets = async () => {
	const result = await db.query(`SELECT * from basket;`);
	return result.rows;
};

exports.selectSingleBasket = async (basket_id) => {
	const result = await db.query(`SELECT * FROM basket WHERE basket_id = $1;`, [
		basket_id,
	]);
	return result.rows;
};

exports.addToBasket = async (basket_id, inputData) => {
	const { item_title, item_author, item_image, price, quantity } = inputData;

	const result = await db.query(
		`
		INSERT INTO basket (basket_id, user_id, item_title, item_author, item_image, price, quantity)
		VALUES ($1, $1, $2, $3, $4, $5, $6)
		RETURNING *;
		`,
		[basket_id, item_title, item_author, item_image, price, quantity]
	);
	return result.rows[0];
};

exports.updateQuantity = async (basket_id, updateItem) => {
	const { inc_quantity, item_title } = updateItem;

	const result = await db.query(
		`UPDATE basket 
				SET quantity = quantity + $1, price = price * (quantity + $1) / quantity
				WHERE basket_id = $2
				AND item_title = $3
				AND (quantity + $1) >= 0
				RETURNING *;`,
		[inc_quantity, basket_id, item_title]
	);
	return result.rows[0];
};
