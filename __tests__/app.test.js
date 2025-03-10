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
				console.log(endpoints);
				expect(endpoints).toEqual(endpointsJson);
			});
	});
});
