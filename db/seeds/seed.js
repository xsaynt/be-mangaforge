const format = require('pg-format');
const db = require('../connection.js');
const mangaList = require('../../utils/myanimelist.js');

const seed = async ({
	basketData,
	favouritesData,
	historyData,
	usersData,
	mangaData,
}) => {
	await db.query('DROP TABLE IF EXISTS basket;');
	await db.query('DROP TABLE IF EXISTS favourites;');
	await db.query('DROP TABLE IF EXISTS history;');
	await db.query('DROP TABLE IF EXISTS users;');
	await db.query('DROP TABLE IF EXISTS manga;');

	await db.query(`
        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR UNIQUE NOT NULL,
            user_email VARCHAR UNIQUE NOT NULL,
            user_password VARCHAR NOT NULL,
            user_picture VARCHAR
        );
    `);

	await db.query(`
		CREATE TABLE manga (
			manga_id SERIAL PRIMARY KEY,
			manga_title VARCHAR NOT NULL,
			manga_author VARCHAR NOT NULL,
			manga_img VARCHAR,
			price NUMERIC(10,2),
			quantity INT NOT NULL CHECK (quantity >= 0)
		);
	`);

	await Promise.all([
		db.query(`
            CREATE TABLE basket (
                basket_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
                user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
                manga_title VARCHAR NOT NULL,
                manga_author VARCHAR NOT NULL,
                manga_img VARCHAR NOT NULL,
                price NUMERIC(10,2),
                quantity INT NOT NULL CHECK (quantity >= 0)
            );
        `),

		db.query(`
            CREATE TABLE favourites (
                favourites_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
                user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
                manga_title VARCHAR NOT NULL,
                manga_author VARCHAR NOT NULL,
                manga_img VARCHAR NOT NULL,
                price NUMERIC(10,2)
            );
        `),

		db.query(`
            CREATE TABLE history (
                history_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
                user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
                manga_title VARCHAR NOT NULL,
                manga_author VARCHAR NOT NULL,
                manga_img VARCHAR NOT NULL,
                price NUMERIC(10,2),
                quantity INT NOT NULL CHECK (quantity >= 0)
            );
        `),
	]);

	if (usersData && usersData.length > 0) {
		const insertUsersQueryStr = format(
			`INSERT INTO users (username, user_email, user_password, user_picture) VALUES %L;`,
			(usersData || []).map(
				({ username, user_email, user_password, user_picture }) => [
					username,
					user_email,
					user_password,
					user_picture,
				]
			)
		);
		await db.query(insertUsersQueryStr);
	} else {
		console.log('No user data to insert.');
	}

	const mangaInfo = await mangaList();

	if (mangaInfo && mangaInfo.length > 0) {
		const insertMangaQueryStr = format(
			`INSERT INTO manga(manga_title, manga_author, manga_img, price, quantity) VALUES %L;`,
			mangaInfo.map(({ title, authors, imageUrl }) => [
				title,
				authors,
				imageUrl,
				Math.random() * (15 - 10) + 10,
				Math.floor(Math.random() * (100 - 40 + 1)) + 40,
			])
		);

		await db.query(insertMangaQueryStr);
	} else {
		console.log('No manga data to insert.');
	}

	const flatBasketData = (basketData || [])
		.flat()
		.map(
			({ user_id, manga_title, manga_author, manga_img, price, quantity }) => [
				user_id,
				user_id,
				manga_title,
				manga_author,
				manga_img,
				price,
				quantity,
			]
		);

	if (basketData && basketData.length > 0) {
		const insertBasketQueryStr = format(
			`INSERT INTO basket(basket_id, user_id, manga_title, manga_author, manga_img, price, quantity) VALUES %L;`,
			flatBasketData
		);
		await db.query(insertBasketQueryStr);
	} else {
		console.log('No basket data to insert.');
	}

	if (favouritesData && favouritesData.length > 0) {
		const insertFavouritesQueryStr = format(
			`INSERT INTO favourites(favourites_id, user_id, manga_title, manga_author, manga_img, price) VALUES %L;`,
			(favouritesData || []).map(
				({ user_id, manga_title, manga_author, manga_img, price }) => [
					user_id,
					user_id,
					manga_title,
					manga_author,
					manga_img,
					price,
				]
			)
		);
		await db.query(insertFavouritesQueryStr);
	} else {
		console.log('No favourites data to insert.');
	}

	const flatHistoryData = (historyData || [])
		.flat()
		.map(
			({ user_id, manga_title, manga_author, manga_img, price, quantity }) => [
				user_id,
				user_id,
				manga_title,
				manga_author,
				manga_img,
				price,
				quantity,
			]
		);

	if (flatHistoryData.length > 0) {
		const insertHistoryQueryStr = format(
			`INSERT INTO history(history_id, user_id, manga_title, manga_author, manga_img, price, quantity) VALUES %L;`,
			flatHistoryData
		);

		await db.query(insertHistoryQueryStr);
	} else {
		console.log('No history data to insert.');
	}
};

module.exports = seed;
