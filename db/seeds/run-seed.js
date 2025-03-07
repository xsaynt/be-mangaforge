import {
	basketData,
	favouritesData,
	historyData,
	usersData,
} from '../data/development-data';
import seed from './seed.js';
import db from '../connection.js';

const runseed = async () => {
	await seed(basketData, favouritesData, historyData, usersData);
	return db.end();
};

runseed();
