const endpointsJson = require('../endpoints.json');
const request = require('supertest');
const db = require('../db/seeds/seed.js');
const app = require('../__app__/app.js');
const data = require('../db/data/test-data');
const dbConnection = require('../db/connection.js');

beforeEach(() => {
	return db(data);
});

afterAll(() => {
	return dbConnection.end();
});

describe('GET /api', () => {
	test('200: Responds with an object detailing documentation for each endpoint', () => {
		return request(app)
			.get('/api')
			.expect(200)
			.then(({ body: { endpoints } }) => {
				expect(endpoints).toEqual(endpointsJson);
			});
	});
});

describe('GET /api/basket', () => {
	test('200: Responds with an array of all basket', () => {
		return request(app)
			.get('/api/basket')
			.expect(200)
			.then(({ body: { baskets } }) => {
				console.log(baskets);
				expect(baskets).toHaveLength(10);
				baskets.forEach((basket) => {
					expect(basket).toHaveProperty('basket_id', expect.any(Number));
					expect(basket).toHaveProperty('user_id', expect.any(Number));
					expect(basket).toHaveProperty('item_title', expect.any(String));
					expect(basket).toHaveProperty('item_author', expect.any(String));
					expect(basket).toHaveProperty('item_image', expect.any(String));
					expect(basket).toHaveProperty('price', expect.any(String));
					expect(basket).toHaveProperty('quantity', expect.any(Number));
				});
			});
	});
});
