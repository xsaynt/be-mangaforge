const {
	basketData,
	favouritesData,
	historyData,
	usersData,
} = require('../data/development-data/index.js');
const seed = require('./seed.js');
const db = require('../connection.js');

const runSeed = async () => {
	try {
		await seed({ basketData, favouritesData, historyData, usersData });
		return db.end();
	} catch (err) {
		console.log('Seeding Error: ', err);
		await db.end();
	}
};

runSeed();
