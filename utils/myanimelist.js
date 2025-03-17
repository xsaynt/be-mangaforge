const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.malclientid' });

const apiKey = process.env.MAL_CLIENT_ID;
const authorCache = new Map();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getAuthorDetails = async (authorId) => {
	if (authorCache.has(authorId)) {
		return authorCache.get(authorId);
	}

	try {
		const response = await axios.get(
			`https://api.myanimelist.net/v2/people/${authorId}`,
			{
				headers: { 'X-MAL-CLIENT-ID': apiKey },
				params: { fields: 'first_name, last_name' },
			}
		);

		const { first_name, last_name } = response.data;
		const fullName = `${first_name} ${last_name}`.trim();

		authorCache.set(authorId, fullName);
		return fullName;
	} catch (error) {
		console.log(error);
		return 'Unknown';
	}
};

const mangaList = async (limit = 100) => {
	try {
		const response = await axios.get(
			'https://api.myanimelist.net/v2/manga/ranking',
			{
				headers: {
					'X-MAL-CLIENT-ID': apiKey,
				},
				params: {
					ranking_type: 'bypopularity',
					limit,
					fields: 'authors, main_picture',
				},
			}
		);

		const topManga = response.data.data;

		const mangaPromise = topManga.map(async (manga, index) => {
			const { id, title, main_picture, authors } = manga.node;
			const imageUrl = main_picture ? main_picture.large : 'No Image';
			let authorName = 'Unknown';

			if (authors && authors.length > 0) {
				const storyAuthor = authors.find((author) =>
					author.role.includes('Story')
				);

				if (storyAuthor) {
					authorName = await getAuthorDetails(storyAuthor.node.id);
				}
			}

			if (index % 5 === 0) {
				await sleep(500);
			}

			return {
				id,
				title,
				authors: authorName,
				imageUrl,
				url: `https://myanimelist.net/manga/${id}`,
			};
		});

		const mangaWithDetails = await Promise.all(mangaPromise);

		return mangaWithDetails;
	} catch (error) {
		console.log(error);
	}
};

mangaList();

module.exports = mangaList;
