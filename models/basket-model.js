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
