const {minify, escape} = require('../utils/index.js');
const layout = require('./layout.js');

const template = minify(`
	<h1>{message}</h1>
	{stack}
`);

function error({message, error}) {
	const stack = error && error.stack ? `<pre class='left'>${escape(error.stack)}</pre>` : '';
	return template.replace('{message}', escape(message)).replace('{stack}', stack);
}

module.exports = function proxyError(context) {
	return layout(error(context), context);
};
