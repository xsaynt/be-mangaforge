const endpointsJson = require('../endpoints.json');
const request = require('supertest');
const db = require('../db/seeds/seed.js');
const app = require('../__app__/app.js');
const data = require('../db/data/test-data');
const dbConnection = require('../db/connection.js');
jest.setTimeout(100000);

beforeAll(async () => {
	await db(data);
});

afterAll(async () => {
	await dbConnection.end();
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
					expect(basket).toHaveProperty('manga_title', expect.any(String));
					expect(basket).toHaveProperty('manga_author', expect.any(String));
					expect(basket).toHaveProperty('manga_img', expect.any(String));
					expect(basket).toHaveProperty('price', expect.any(String));
					expect(basket).toHaveProperty('quantity', expect.any(Number));
				});
			});
	});
});

describe('GET /api/basket/:basket_id', () => {
	test('200: Responds with the basket related to the input basket_id', () => {
		return request(app)
			.get('/api/basket/3')
			.expect(200)
			.then(({ body: basket }) => {
				expect(basket).toHaveLength(2);
				basket.forEach((manga) => {
					expect(manga).toHaveProperty('basket_id', 3);
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
	test('404: Responds with a not found error when passed a basket_id that does not exist', () => {
		return request(app)
			.get('/api/basket/100')
			.expect(404)
			.then(({ body }) => {
				expect(body.msg).toBe('Not Found');
			});
	});
});

describe('POST /api/basket/:basket_id', () => {
	test('201: Adds another manga to the basket of a specified basket', () => {
		const inputData = {
			manga_title: 'Dandadan',
			manga_author: 'Yukinobu Tatsu',
			manga_img: 'https://m.media-amazon.com/imgs/I/911akONEKzL._SL1500_.jpg',
			price: 12.99,
			quantity: 1,
		};

		return request(app)
			.post('/api/basket/3')
			.send(inputData)
			.expect(201)
			.then(({ body }) => {
				expect(body).toMatchObject({
					basket_id: 3,
					user_id: 3,
					manga_title: 'Dandadan',
					manga_author: 'Yukinobu Tatsu',
					manga_img:
						'https://m.media-amazon.com/imgs/I/911akONEKzL._SL1500_.jpg',
					price: '12.99',
					quantity: 1,
				});
			});
	});
	test('404: Returns a not found error when attempting to post to a non existing basket_id', () => {
		const inputData = {
			manga_title: 'Dandadan',
			manga_author: 'Yukinobu Tatsu',
			manga_img: 'https://m.media-amazon.com/imgs/I/911akONEKzL._SL1500_.jpg',
			price: 12.99,
			quantity: 1,
		};

		return request(app)
			.post('/api/basket/4')
			.send(inputData)
			.expect(404)
			.then(({ body }) => {
				expect(body.msg).toBe('Not Found');
			});
	});
	test('400: Returns a does not exist error when attempting to post to a invalid basket_id input', () => {
		const inputData = {
			manga_title: 'Dandadan',
			manga_author: 'Yukinobu Tatsu',
			manga_img: 'https://m.media-amazon.com/imgs/I/911akONEKzL._SL1500_.jpg',
			price: 12.99,
			quantity: 1,
		};

		return request(app)
			.post('/api/basket/abc')
			.send(inputData)
			.expect(400)
			.then(({ body }) => {
				expect(body.msg).toBe('Bad Request');
			});
	});
});

describe('PATCH /api/basket/:basket_id', () => {
	test('200: Returns an updated quantity and price field when quantity amended', () => {
		const updatedmanga = { inc_quantity: 2, manga_title: 'EIGHTY SIX' };

		return request(app)
			.patch('/api/basket/3')
			.send(updatedmanga)
			.expect(200)
			.then(({ body }) => {
				expect(body).toHaveProperty('quantity', 3);
				expect(body).toHaveProperty('price', '29.85');
			});
	});
});
