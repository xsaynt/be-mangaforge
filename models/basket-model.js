const db = require('../db/connection');

exports.selectAllBaskets = async () => {
	const result = await db.query(`SELECT * from basket;`);
	console.log(result.rows);
	return result.rows;
};
