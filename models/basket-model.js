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
	const { manga_title, manga_author, manga_img, price, quantity } = inputData;

	const result = await db.query(
		`
		INSERT INTO basket (basket_id, user_id, manga_title, manga_author, manga_img, price, quantity)
		VALUES ($1, $1, $2, $3, $4, $5, $6)
		RETURNING *;
		`,
		[basket_id, manga_title, manga_author, manga_img, price, quantity]
	);
	return result.rows[0];
};

exports.updateQuantity = async (basket_id, updatemanga) => {
	const { inc_quantity, manga_title } = updatemanga;

	const result = await db.query(
		`UPDATE basket 
				SET quantity = quantity + $1, price = price * (quantity + $1) / quantity
				WHERE basket_id = $2
				AND manga_title = $3
				AND (quantity + $1) >= 0
				RETURNING *;`,
		[inc_quantity, basket_id, manga_title]
	);
	return result.rows[0];
};

exports.deleteMangaFromBasket = async (basket_id, deleteManga) => {
	const { manga_title } = deleteManga;

	const result = await db.query(
		`
			DELETE FROM basket
			WHERE baset_id = $1
			AND manga_title = $2;
		`,
		[basket_id, manga_title]
	);
	return result.rows;
};
