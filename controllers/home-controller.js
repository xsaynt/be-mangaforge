const endpointsJson = require('../endpoints.json');

const homeController = (req, res, next) => {
	res.status(200).send({ endpoints: endpointsJson });
};

module.exports = homeController;
