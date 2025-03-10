const db = require('../db/connection');

exports.selectAllBaskets = async () => {
	const result = await db.query(`SELECT * from basket;`);
	return result.rows;
};
