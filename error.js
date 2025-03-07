export const postgresErrorHandler = (err, req, res, next) => {
	if (err.code === '22P02') {
		res.status(400).send({ msg: 'Bad Request' });
	} else if (
		err.code === '23503' ||
		err.code === '42703' ||
		err.code === '42601'
	) {
		res.status(404).send({ msg: 'Not Found' });
	} else {
		next(err);
	}
};

export const customErrorHandler = (err, req, res, next) => {
	if (err.status && err.msg) {
		res.status(err.status).send({ msg: err.msg });
	} else {
		next(err);
	}
};

export const serverErrorHandler = (err, req, res, next) => {
	console.log('Error is: ', err);
	res.status(500).send({ msg: 'Internal Server Error' });
};
