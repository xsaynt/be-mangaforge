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
	test('200: Responds with an array of all baskets', () => {
		return request(app)
			.get('/api/basket')
			.expect(200)
			.then(({ body: { baskets } }) => {
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

describe('GET /api/basket/:basket_id', () => {
	test('200: Responds with the basket related to the input basket_id', () => {
		return request(app)
			.get('/api/basket/1')
			.expect(200)
			.then(({ body: basket }) => {
				expect(basket).toHaveLength(5);
				basket.forEach((item) => {
					expect(item).toHaveProperty('basket_id', 1);
				});
			});
	});
	test('400: Responds with a does not exist error when passed a parameter that is not a number', () => {
		return request(app)
			.get('/api/basket/abc')
			.expect(400)
			.then(({ body }) => {
				expect(body.msg).toBe('Bad Request');
			});
	});
	test('404: Responds with a not found error when passed a user_id that does not exist', () => {
		return request(app)
			.get('/api/basket/100')
			.expect(404)
			.then(({ body }) => {
				expect(body.msg).toBe('Not Found');
			});
	});
});
