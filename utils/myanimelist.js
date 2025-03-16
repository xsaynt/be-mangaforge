const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.malclientid' });

const apiKey = process.env.MAL_CLIENT_ID;

const getAuthorDetails = async (authorId) => {
	try {
		const response = await axios.get(
			`https://api.myanimelist.net/v2/people/${authorId}`,
			{
				headers: { 'X-MAL-CLIENT-ID': apiKey },
				params: { fields: 'first_name,last_name,image_url' },
			}
		);

		const { first_name, last_name } = response.data;
		return `${first_name} ${last_name}`.trim();
	} catch (error) {
		console.log(error);
		return 'Unknown';
	}
};

const getMangaDetails = async (mangaId) => {
	try {
		const response = await axios.get(
			`https://api.myanimelist.net/v2/manga/${mangaId}`,
			{
				headers: { 'X-MAL-CLIENT-ID': apiKey },
				params: { fields: 'authors' },
			}
		);

		const authors = response.data.authors
			? await getAuthorDetails(response.data.authors[0].node.id)
			: 'Unknown';

		return authors;
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
				params: { ranking_type: 'bypopularity', limit },
			}
		);

		const topManga = response.data.data;

		const mangaPromise = topManga.map(async (manga) => {
			const { id, title, main_picture } = manga.node;
			const imageUrl = main_picture ? main_picture.large : 'No Image';
			const authors = await getMangaDetails(id);

			return {
				id,
				title,
				authors,
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
