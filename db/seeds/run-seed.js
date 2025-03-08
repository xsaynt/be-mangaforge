import {
	basketData,
	favouritesData,
	historyData,
	usersData,
} from '../data/development-data';
import seed from './seed.js';
import db from '../connection.js';

const runSeed = async () => {
	try {
		await seed(basketData, favouritesData, historyData, usersData);
		return db.end();
	} catch (err) {
		console.log('Seeding Error: ', err);
		await db.end();
	}
};

runSeed();
