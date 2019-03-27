const {URL} = require('url');
const debug = require('debug')('vikas-auth:valid-url');

module.exports = function ensureUrlIsValid(req, _, next) {
	let {url} = req.params;
	debug('Validating', url);
	if (!url) {
		throw new Error('URL not supplied');
	}

	url = decodeURI(url);

	if (!url.startsWith('http')) {
		url = `https://${url}`;
	}

	url = new URL(url);
	debug(url);

	if (!url.hostname || !url.pathname) {
		throw new Error('URL not valid');
	}

	req.params.url = url.toString();

	next();
};